import {defineField, defineType} from 'sanity'

const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({name:'title',title:'Título para buscadores',type:'string',validation:r=>r.max(65)}),
    defineField({name:'description',title:'Descrição para buscadores',type:'text',rows:3,validation:r=>r.max(160)}),
    defineField({name:'image',title:'Imagem de compartilhamento',type:'image',options:{hotspot:true}}),
  ],
})

const imageWithAlt = defineType({
  name:'imageWithAlt',title:'Imagem com acessibilidade',type:'object',
  fields:[
    defineField({name:'image',title:'Imagem',type:'image',options:{hotspot:true},validation:r=>r.required()}),
    defineField({name:'alt',title:'Descrição da imagem',type:'string',validation:r=>r.required()}),
  ],
})

const siteSettings = defineType({
  name:'siteSettings',title:'Configurações gerais',type:'document',
  fields:[
    defineField({name:'companyName',title:'Nome da empresa',type:'string',validation:r=>r.required()}),
    defineField({name:'contactEmail',title:'E-mail público',type:'email'}),
    defineField({name:'phone',title:'Telefone público',type:'string'}),
    defineField({name:'whatsapp',title:'WhatsApp (somente números, com DDI)',type:'string',validation:r=>r.regex(/^\d{10,15}$/).warning('Use somente números, inclusive DDI.')}),
    defineField({name:'instagram',title:'URL do Instagram',type:'url'}),
    defineField({name:'linkedin',title:'URL do LinkedIn',type:'url'}),
    defineField({name:'addressText',title:'Localização pública',type:'string'}),
  ],
})

const homePage = defineType({
  name:'homePage',title:'Página inicial',type:'document',
  fields:[
    defineField({name:'eyebrow',title:'Texto de apoio da abertura',type:'string'}),
    defineField({name:'headline',title:'Título da abertura',type:'string'}),
    defineField({name:'intro',title:'Texto introdutório',type:'text',rows:4}),
    defineField({name:'heroPoster',title:'Imagem de capa da Hero (não altera o vídeo)',type:'image',options:{hotspot:true}}),
    defineField({name:'seo',title:'SEO',type:'seo'}),
  ],
})

const aboutPage = defineType({
  name:'aboutPage',title:'Sobre',type:'document',
  fields:[
    defineField({name:'headline',title:'Título',type:'string'}),
    defineField({name:'intro',title:'Introdução',type:'text',rows:5}),
    defineField({name:'story',title:'História e abordagem',type:'array',of:[{type:'block'}]}),
    defineField({name:'team',title:'Equipe',type:'array',of:[{
      type:'object',name:'teamMember',fields:[
        defineField({name:'name',title:'Nome',type:'string',validation:r=>r.required()}),
        defineField({name:'role',title:'Cargo',type:'string'}),
        defineField({name:'bio',title:'Biografia',type:'text'}),
        defineField({name:'photo',title:'Foto',type:'image',options:{hotspot:true}}),
      ],preview:{select:{title:'name',subtitle:'role',media:'photo'}}
    }]}),
    defineField({name:'seo',title:'SEO',type:'seo'}),
  ],
})

const service = defineType({
  name:'service',title:'Serviço',type:'document',
  fields:[
    defineField({name:'title',title:'Nome do serviço',type:'string',validation:r=>r.required()}),
    defineField({name:'slug',title:'Identificador',type:'slug',options:{source:'title'},validation:r=>r.required()}),
    defineField({name:'summary',title:'Descrição resumida',type:'text',rows:3}),
    defineField({name:'description',title:'Descrição detalhada',type:'array',of:[{type:'block'}]}),
    defineField({name:'image',title:'Imagem',type:'image',options:{hotspot:true}}),
    defineField({name:'order',title:'Ordem de exibição',type:'number',validation:r=>r.min(0).integer()}),
    defineField({name:'visible',title:'Visível no site',type:'boolean',initialValue:true}),
  ],
  orderings:[{title:'Ordem de exibição',name:'orderAsc',by:[{field:'order',direction:'asc'}]}],
})

const project = defineType({
  name:'project',title:'Projeto',type:'document',
  fields:[
    defineField({name:'title',title:'Título',type:'string',validation:r=>r.required()}),
    defineField({name:'slug',title:'Identificador',type:'slug',options:{source:'title'},validation:r=>r.required()}),
    defineField({name:'summary',title:'Resumo',type:'text',rows:3}),
    defineField({name:'description',title:'Descrição completa',type:'array',of:[{type:'block'}]}),
    defineField({name:'category',title:'Área de atuação',type:'string'}),
    defineField({name:'cover',title:'Capa',type:'imageWithAlt'}),
    defineField({name:'gallery',title:'Galeria',type:'array',of:[{type:'imageWithAlt'}]}),
    defineField({name:'order',title:'Ordem de exibição',type:'number',validation:r=>r.min(0).integer()}),
    defineField({name:'publishedOnSite',title:'Autorizado para aparecer no site',type:'boolean',initialValue:false}),
    defineField({name:'clientApproved',title:'Uso de conteúdo e imagens autorizado pelo cliente',type:'boolean',initialValue:false}),
    defineField({name:'seo',title:'SEO',type:'seo'}),
  ],
  preview:{select:{title:'title',subtitle:'category'}},
  orderings:[{title:'Ordem de exibição',name:'orderAsc',by:[{field:'order',direction:'asc'}]}],
})

const contactPage = defineType({
  name:'contactPage',title:'Página de contato',type:'document',
  fields:[
    defineField({name:'headline',title:'Título',type:'string'}),
    defineField({name:'intro',title:'Texto introdutório',type:'text'}),
    defineField({name:'seo',title:'SEO',type:'seo'}),
  ],
})

export const schemaTypes=[seo,imageWithAlt,siteSettings,homePage,aboutPage,service,project,contactPage]
