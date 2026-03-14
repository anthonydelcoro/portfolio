import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://anthonydelcoro.github.io',
  base: '/portfolio',
  integrations: [
    starlight({
      title: 'My Site',
      sidebar: [
        { slug: 'resume' },
        {
          label: 'Projects',
          autogenerate: { directory: 'projects' }
        },
        {
          label: 'Travel',
          autogenerate: { directory: 'travel' }
        },
        {
          label: 'Notes',
          autogenerate: { directory: 'notes' }
        }
      ]
    })
  ]
})
