/**
 * Importação inicial não destrutiva do conteúdo já presente no site da Ykeizumi.
 * Executar via GitHub Actions com token Editor (permissão de escrita no dataset).
 * Nunca sobrescrever campos editados pelos responsáveis do site.
 */
import {createClient} from '@sanity/client'
import {load} from 'cheerio'
import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {renderPage} from '../../src/lib/render.mjs'
import {routes} from '../../src/site.mjs'
import {serviceCards} from '../../src/content/services.mjs'
import {approvedProjects, editorialPhotos} from '../../src/content/projects.mjs'

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)))
const projectId = process.env.SANITY_PROJECT_ID || 'fvoy1wqw'
const dataset = process.env.SANITY_DATASET || 'production'
const dryRun = process.env.SEED_DRY_RUN === 'true'
const token = process.env.SANITY_CONTENT_TOKEN
if (!dryRun && !token) throw new Error('SANITY_CONTENT_TOKEN ausente. Cadastre um token Sanity Editor como secret do GitHub.')
const client = dryRun ? null : createClient({
  projectId, dataset, apiVersion:'2026-06-09', token, useCdn:false,
})
const normalize = (value) => String(value || '').replace(/\s+/g,' ').trim()
const docs = routes.map(route => {
  const $ = load(renderPage(route))
  const sections = $('main').first().find('section').filter((_,el)=>$(el).parents('section').length===0)
    .toArray().map((el,i)=>{
      const node=$(el)
      const entries=node.find('h1,h2,h3,p').toArray()
        .filter(child=>$(child).closest('[aria-hidden="true"]').length===0)
        .map(child=>({tag:child.tagName.toLowerCase(),text:normalize($(child).text())}))
        .filter(x=>x.text.length>0).map((item,j)=>({
          _type:'textEntry',_key:'t'+j,element:item.tag,text:item.text,
        }))
      const label = normalize(node.find('h2,h1').first().text()).slice(0,90)
      return {_type:'pageSection',_key:'s'+i,sectionId:node.attr('id')||('secao-'+(i+1)),label:label||('Seção '+(i+1)),entries}
    }).filter(section=>section.entries.length>0)
  const main=$('main').first()
  const headline=normalize(main.find('h1').first().text())
  const intro=route.slug===''?normalize($('.ha-description').first().text()):
    normalize(main.find('section p').first().text())
  const seo={_type:'seo',title:normalize($('title').first().text()),
    description:normalize($('meta[name="description"]').attr('content'))}
  const type={'':'homePage','sobre':'aboutPage','servicos':'servicesPage',
    'projetos':'projectsPage','contato':'contactPage'}[route.slug]
  return {_id:type,_type:type,headline,intro,sections,seo}
})
const photoPath = name => resolve(root,'public/media',name)
const assetCache = new Map()
async function asset(name) {
  if (dryRun) return {_id:'image-dry-run-'+name}
  if (!assetCache.has(name)) {
    const response = await client.assets.upload('image',createReadStream(photoPath(name)),{filename:name})
    assetCache.set(name,response)
    console.log('Imagem importada:',name)
  }
  return assetCache.get(name)
}
const image = result => ({_type:'image',asset:{_type:'reference',_ref:result._id}})
const summary = {created:0,preserved:0,completed:0}
async function seed(doc,mediaLoader) {
  if (dryRun) {
    console.log('[DRY RUN] Documento:',doc._id,doc.sections?.length || 0,'seções')
    return
  }
  const existing = await client.getDocument(doc._id)
  const draft = await client.getDocument('drafts.'+doc._id)
  if (!existing && mediaLoader) Object.assign(doc,await mediaLoader())
  const fields=Object.fromEntries(Object.entries(doc).filter(([k])=>!k.startsWith('_')))
  // Já editado no Studio: preencher somente campos ausentes, sem substituir dados.
  if (existing) {
    await client.patch(doc._id).setIfMissing(fields).commit()
    summary.preserved++
  } else {
    await client.createIfNotExists(doc)
    summary.created++
  }
  if (draft) await client.patch('drafts.'+doc._id).setIfMissing(fields).commit()
  summary.completed++
  console.log('Documento verificado:',doc._id)
}

if (approvedProjects.length !== 0) {
  throw new Error('A lista de projetos reais mudou; revisar consentimentos antes de importar.')
}
await seed({_id:'siteSettings',_type:'siteSettings',
  companyName:'Ykeizumi Consultoria Ambiental',addressText:'Joinville · Santa Catarina'})
for(const doc of docs) {
  if(doc._type==='homePage'){
    doc.eyebrow='Visão Técnica sobre o território.'
    await seed(doc,async()=>({heroPoster:image(await asset('hero-poster.webp'))}))
  } else if(doc._type==='aboutPage') {
    doc.team=[{_key:'lara',_type:'teamMember',
      name:'Lara Yumi',role:'À frente da Ykeizumi Consultoria Ambiental.',
      bio:'A consultoria considera o contexto de cada projeto e as particularidades de cada demanda ambiental.'}]
    await seed(doc,async()=>({
      team:[{...doc.team[0],photo:image(await asset('lara-yumi-1280.webp'))}],
    }))
  } else await seed(doc)
}
for(const service of serviceCards) {
  const doc={_id:'service.'+service.slug,_type:'service',title:service.title,
    slug:{_type:'slug',current:service.slug},summary:service.description,
    order:Number(service.num),visible:true,
    imageAlt:'Imagem ilustrativa do território — '+service.title}
  await seed(doc,async()=>({image:image(await asset(service.media+'-1280.webp'))}))
}
const gallery={_id:'illustrativeGallery',_type:'illustrativeGallery',
  intro:'Imagens ilustrativas das paisagens e dos territórios. Não representam projetos realizados pela Ykeizumi.'}
await seed(gallery,async()=>({
  photos:await Promise.all(editorialPhotos.map(async (p,i)=>({
    _key:p.id,_type:'galleryImage',title:p.title,
    photo:{_type:'imageWithAlt',image:image(await asset(p.id+'-1280.webp')),alt:p.alt},
    note:'Imagem ilustrativa — não representa projeto realizado',
  }))),
}))
console.log('Importação finalizada:',JSON.stringify(summary))
console.log('Projetos reais importados: 0 (não há projetos aprovados no repositório).')
