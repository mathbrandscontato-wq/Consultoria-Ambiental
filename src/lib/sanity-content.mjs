/**
 * Adaptador de leitura em build-time. Nunca expõe token ao navegador.
 * Não altera o site até a integração editorial ser explicitamente ligada.
 */
const VERSION='2026-06-09';
const slugPattern=/^[a-z0-9_-]+$/;
export const sanityEnabled=(env=process.env)=>env.YKEIZUMI_SANITY_ENABLED==='true';
export async function loadSanityContent({env=process.env,fetcher=fetch}={}){
  if(!sanityEnabled(env)) return null;
  const id=env.SANITY_PROJECT_ID;
  const dataset=env.SANITY_DATASET||'production';
  if(!id||!slugPattern.test(id)||!slugPattern.test(dataset)) throw new Error('Sanity: project ID ou dataset inválido');
  const query=`{
    "settings": *[_type=="siteSettings" && _id=="siteSettings"][0],
    "home": *[_type=="homePage" && _id=="homePage"][0],
    "about": *[_type=="aboutPage" && _id=="aboutPage"][0],
    "contact": *[_type=="contactPage" && _id=="contactPage"][0],
    "services": *[_type=="service" && visible==true]|order(order asc, title asc),
    "projects": *[_type=="project" && publishedOnSite==true && clientApproved==true]|order(order asc, title asc)
  }`;
  const url=new URL(`https://${id}.api.sanity.io/v${VERSION}/data/query/${dataset}`);
  url.searchParams.set('query',query);
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),10000);
  try{
    const response=await fetcher(url,{headers:env.SANITY_READ_TOKEN?{Authorization:`Bearer ${env.SANITY_READ_TOKEN}`}:{},signal:controller.signal});
    if(!response.ok) throw new Error(`Sanity retornou HTTP ${response.status}`);
    const payload=await response.json();
    if(!payload.result||typeof payload.result!=='object') throw new Error('Resposta do Sanity inválida');
    return payload.result;
  }finally{clearTimeout(timeout)}
}
