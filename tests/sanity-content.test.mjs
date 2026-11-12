import test from 'node:test'
import assert from 'node:assert/strict'
import {loadSanityContent,sanityEnabled} from '../src/lib/sanity-content.mjs'

test('Sanity desabilitado por padrão, sem requisição',async()=>{
  assert.equal(sanityEnabled({}),false)
  let called=false
  const result=await loadSanityContent({env:{},fetcher:async()=>{called=true}})
  assert.equal(result,null)
  assert.equal(called,false)
})
test('project ID inválido é rejeitado antes da chamada de rede',async()=>{
  await assert.rejects(loadSanityContent({env:{YKEIZUMI_SANITY_ENABLED:'true',SANITY_PROJECT_ID:'bad.example'}}),/inválido/)
})
test('consulta publicada filtra projetos sem aprovação',async()=>{
  let request
  const result=await loadSanityContent({
    env:{YKEIZUMI_SANITY_ENABLED:'true',SANITY_PROJECT_ID:'abc12345',SANITY_DATASET:'production'},
    fetcher:async(url,options)=>{request={url,options};return {ok:true,json:async()=>({result:{projects:[],services:[]}})}}
  })
  assert.deepEqual(result.projects,[])
  assert.match(request.url.searchParams.get('query'),/clientApproved==true/)
  assert.match(request.url.searchParams.get('query'),/publishedOnSite==true/)
  assert.equal(request.options.headers.Authorization,undefined)
})
test('erro remoto interrompe a leitura e não fornece conteúdo falso',async()=>{
  await assert.rejects(loadSanityContent({
    env:{YKEIZUMI_SANITY_ENABLED:'true',SANITY_PROJECT_ID:'abc12345'},
    fetcher:async()=>({ok:false,status:403})
  }),/HTTP 403/)
})
