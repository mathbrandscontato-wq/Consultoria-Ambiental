import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

const singletonTypes = ['siteSettings', 'homePage', 'aboutPage', 'servicesPage', 'projectsPage', 'contactPage', 'illustrativeGallery']

export default defineConfig({
  name: 'default',
  title: 'Ykeizumi | Conteúdo do site',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'fvoy1wqw',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({
    structure: (S) => S.list().title('Conteúdo do site').items([
      ...singletonTypes.map(type =>
        S.listItem().title({
          siteSettings: 'Configurações gerais',
          homePage: 'Página inicial',
          aboutPage: 'Sobre',
          servicesPage: 'Página de serviços',
          projectsPage: 'Página de projetos',
          illustrativeGallery: 'Galeria de imagens ilustrativas',
          contactPage: 'Contato',
        }[type]).id(type).child(S.document().schemaType(type).documentId(type))),
      S.divider(),
      S.documentTypeListItem('service').title('Cadastro de serviços'),
      S.documentTypeListItem('project').title('Projetos reais (somente autorizados)'),
    ]),
  })],
  schema: {types: schemaTypes},
  document: {
    newDocumentOptions: (previous) => previous.filter(({templateId}) =>
      !singletonTypes.includes(templateId)),
  },
})
