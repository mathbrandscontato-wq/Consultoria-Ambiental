import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
if (!projectId) throw new Error('Defina SANITY_STUDIO_PROJECT_ID em studio/.env.local')

export default defineConfig({
  name: 'default',
  title: 'Ykeizumi | Conteúdo do site',
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool()],
  schema: {types: schemaTypes},
  document: {
    newDocumentOptions: (previous) => previous.filter(({templateId}) =>
      !['siteSettings','homePage','aboutPage','contactPage'].includes(templateId)),
  },
})
