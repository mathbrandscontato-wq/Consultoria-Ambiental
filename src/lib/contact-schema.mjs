import { serviceCards } from '../content/services.mjs';

export const PROFILES = Object.freeze(['Pessoa física','Empresa ou empreendimento','Prefeitura ou órgão público','Outro']);
export const STATES = Object.freeze('AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO'.split(' '));
export const CHANNELS = Object.freeze(['WhatsApp','E-mail']);
export const LIMITS = Object.freeze({ name:120, description:3000, city:100, email:254 });
const ddCodes = new Set('11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99'.split(' '));
export const normalizeSpaces = value => String(value ?? '').trim().replace(/\s+/gu,' ');
export const validService = value => serviceCards.some(service => service.slug === value);
export const serviceFromQuery = query => { const value = new URLSearchParams(query).get('servico'); return validService(value) ? value : ''; };
export const serviceLabel = value => serviceCards.find(service => service.slug === value)?.title || (value === 'unknown' ? 'Não sei ainda' : '');
export function phoneDigits(value) {
 let number = String(value ?? '').replace(/\D/g,'');
 if (number.startsWith('55') && [12,13].includes(number.length)) number = number.slice(2);
 return number;
}
export function formatPhone(value) {
 const digits = phoneDigits(value).slice(0,11);
 if (digits.length < 3) return digits ? '('+digits : '';
 const local = digits.slice(2), split = local.length > 8 ? 5 : 4;
 return '('+digits.slice(0,2)+') '+local.slice(0,split)+(local.length > split ? '-'+local.slice(split) : '');
}
export function normalizeAnswers(input = {}) {
 return {name:normalizeSpaces(input.name),profile:normalizeSpaces(input.profile),service:String(input.service ?? ''),description:String(input.description ?? '').trim().replace(/\r\n?/g,'\n'),city:normalizeSpaces(input.city),state:normalizeSpaces(input.state).toUpperCase(),channel:String(input.channel ?? ''),contact:String(input.contact ?? '').trim()};
}
const simpleText = value => !/[\u0000-\u001f\u007f]/u.test(value);
export function validateStep(step, input) {
 const a = normalizeAnswers(input), errors = {};
 if (step === 0 && (a.name.length < 2 || a.name.length > LIMITS.name || !simpleText(a.name))) errors.name = 'Informe um nome entre 2 e 120 caracteres.';
 if (step === 1 && !PROFILES.includes(a.profile)) errors.profile = 'Selecione como você está entrando em contato.';
 if (step === 2 && !validService(a.service) && a.service !== 'unknown') errors.service = 'Selecione um serviço ou “Não sei ainda”.';
 if (step === 3 && (a.description.length < 10 || a.description.length > LIMITS.description || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(a.description))) errors.description = 'Descreva a demanda entre 10 e 3.000 caracteres.';
 if (step === 4) {
  if (a.city.length < 2 || a.city.length > LIMITS.city || !simpleText(a.city)) errors.city = 'Informe a cidade, entre 2 e 100 caracteres.';
  if (!STATES.includes(a.state)) errors.state = 'Selecione uma UF válida.';
 }
 if (step === 5) {
  if (!CHANNELS.includes(a.channel)) errors.channel = 'Escolha o canal para retorno.';
  else if (a.channel === 'E-mail' && (a.contact.length > LIMITS.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(a.contact))) errors.contact = 'Informe um endereço de e-mail válido.';
  else if (a.channel === 'WhatsApp') {
   const digits = phoneDigits(a.contact);
   if (![10,11].includes(digits.length) || !ddCodes.has(digits.slice(0,2)) || (digits.length === 11 ? digits[2] !== '9' : !/[2-5]/.test(digits[2])) || /^(\d)\1+$/.test(digits)) errors.contact = 'Informe um telefone brasileiro válido com DDD.';
  }
 }
 return errors;
}
export function validateAll(input) { return Object.assign({}, ...Array.from({length:6},(_,step) => validateStep(step,input))); }
export function toPayload(input) {
 const a = normalizeAnswers(input), errors = validateAll(a);
 if (Object.keys(errors).length) { const error = new Error('Há informações inválidas.'); error.fields = errors; throw error; }
 return {...a,contact:a.channel === 'WhatsApp' ? '+55'+phoneDigits(a.contact) : a.contact};
}
export function createContactFlow(service = '') {
 let step = 0, editing = false, editBackup = null, answers = normalizeAnswers({service:validService(service) ? service : ''});
 return {
  get snapshot() { return {step,editing,progress:Math.round(step/6*1000)/10,answers:{...answers}}; },
  update(patch) { answers = {...answers,...patch}; },
  next() { const errors = validateStep(step,answers); if (Object.keys(errors).length) return {ok:false,errors}; answers = normalizeAnswers(answers); step = editing ? 6 : Math.min(6,step+1); editing = false; editBackup = null; return {ok:true,errors:{}}; },
  back() { if (editing) { answers = editBackup; editBackup = null; step = 6; editing = false; } else step = Math.max(0,step-1); },
  edit(index) { if (step !== 6 || !Number.isInteger(index) || index < 0 || index > 5) return false; editBackup = {...answers}; step = index; editing = true; return true; },
  clear() { answers = normalizeAnswers(); step = 0; editing = false; editBackup = null; }
 };
}
/** Fail-closed contract. No endpoint, privacy approval or network is enabled by default. */
export function createSubmissionAdapter({endpoint,privacyVerified=false,securityVerified=false,fetchImpl} = {}) {
 let pending = false, attemptKey = '', previousPayload = '', accepted = false;
 const enabled = Boolean(endpoint && /^https:\/\//.test(endpoint) && privacyVerified && securityVerified && typeof fetchImpl === 'function');
 return {
  enabled,
  async submit(input) {
   if (!enabled) throw Object.assign(new Error('O envio não está habilitado: faltam integração e privacidade verificadas.'),{code:'INTEGRATION_UNAVAILABLE'});
   if (pending || accepted) throw Object.assign(new Error('A solicitação já está em processamento ou foi recebida.'),{code:'DUPLICATE_SUBMISSION'});
   const payload = toPayload(input), serialized = JSON.stringify(payload);
   if (serialized !== previousPayload) { previousPayload = serialized; attemptKey = crypto.randomUUID(); }
   pending = true;
   try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(),15000);
    let response;
    try { response = await fetchImpl(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':attemptKey},body:serialized,credentials:'same-origin',redirect:'error',signal:controller.signal}); } finally { clearTimeout(timeout); }
    if (!response.ok) throw new Error('Não foi possível enviar agora. Suas respostas foram preservadas.');
    const receipt = await response.json();
    if (receipt?.accepted !== true || typeof receipt.receipt !== 'string' || receipt.receipt.length < 8) throw new Error('Não recebemos uma confirmação válida. Suas respostas foram preservadas.');
    accepted = true;previousPayload='';
    return {accepted:true,receipt:receipt.receipt};
   } finally { pending = false; }
  }
 };
}
