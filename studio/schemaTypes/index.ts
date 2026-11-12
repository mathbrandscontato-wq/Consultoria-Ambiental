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

const textEntry = defineType({
  name: 'textEntry', title: 'Texto da seção', type: 'object',
  fields: [
    defineField({name:'element', title:'Tipo de texto original',type:'string',readOnly:true}),
    defineField({name:'text',title:'Texto',type:'text',rows:3,validation:r=>r.required()}),
  ],
  preview:{select:{title:'text',subtitle:'element'}},
})
const pageSection = defineType({
  name:'pageSection',title:'Seção do site',type:'object',
  fields:[
    defineField({name:'sectionId',title:'Identificador da seção',type:'string',readOnly:true}),
    defineField({name:'label',title:'Nome da seção',type:'string',readOnly:true}),
    defineField({name:'entries',title:'Textos em ordem de exibição',type:'array',of:[{type:'textEntry'}]}),
  ],
  preview:{select:{title:'label',subtitle:'sectionId'}},
})
const galleryImage = defineType({
  name:'galleryImage',title:'Foto editorial',type:'object',
  fields:[
    defineField({name:'title',title:'Nome da fotografia',type:'string',validation:r=>r.required()}),
    defineField({name:'photo',title:'Imagem',type:'imageWithAlt',validation:r=>r.required()}),
    defineField({name:'note',title:'Observação',type:'string',initialValue:'Imagem ilustrativa — não representa projeto realizado'}),
  ],
  preview:{select:{title:'title',media:'photo.image'}},
})
const pageSectionsField = () => defineField({
  name:'sections',title:'Demais seções e textos da página',type:'array',of:[{type:'pageSection'}],
  description:'Textos importados do site existente, agrupados por seção. A integração visual será feita após homologação.',
})
const servicesPage = defineType({
  name:'servicesPage',title:'Página de serviços',type:'document',
  fields:[
    defineField({name:'headline',title:'Título da página',type:'string'}),
    defineField({name:'intro',title:'Texto introdutório',type:'text',rows:4}),
    pageSectionsField(),
    defineField({name:'seo',title:'SEO',type:'seo'}),
  ],
})
const projectsPage = defineType({
  name:'projectsPage',title:'Página de projetos',type:'document',
  fields:[
    defineField({name:'headline',title:'Título da página',type:'string'}),
    defineField({name:'intro',title:'Texto introdutório',type:'text',rows:4}),
    pageSectionsField(),
    defineField({name:'seo',title:'SEO',type:'seo'}),
  ],
})
const illustrativeGallery = defineType({
  name:'illustrativeGallery',title:'Galeria ilustrativa',type:'document',
  fields:[
    defineField({name:'intro',title:'Observação de uso',type:'string',initialValue:'Fotografias ilustrativas, não projetos realizados pela Ykeizumi.'}),
    defineField({name:'photos',title:'Fotografias editoriais',type:'array',of:[{type:'galleryImage'}]}),
  ],
})

const siteSettings = defineType({
  name:'siteSettings',title:'Configurações gerais',type:'document',
  fields:[
    defineField({name:'companyName',title:'Nome da empresa',type:'string',validation:r=>r.required()}),
    defineField({name:'cnpj',title:'CNPJ',type:'string',validation:r=>r.regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/).error('Use o formato 00.000.000/0000-00')}),
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
    pageSectionsField(),
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
    pageSectionsField(),
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
    pageSectionsField(),
    defineField({name:'headline',title:'Título',type:'string'}),
    defineField({name:'intro',title:'Texto introdutório',type:'text'}),
    defineField({name:'seo',title:'SEO',type:'seo'}),
  ],
})

export const schemaTypes=[seo,imageWithAlt,textEntry,pageSection,galleryImage,siteSettings,homePage,aboutPage,servicesPage,projectsPage,illustrativeGallery,service,project,contactPage]
