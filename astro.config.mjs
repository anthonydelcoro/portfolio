import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://anthonydelcoro.github.io',
  base: '/portfolio',
  integrations: [
    starlight({
      title: 'Anthony Del Coro',
      components: {
        Header: './src/components/Header.astro',
        TwoColumnContent: './src/components/TwoColumnContent.astro',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Home', link: '/' },
        { slug: 'resume' },
        { slug: 'contact' },
        { slug: 'projects/projects' },
        { slug: 'travel/travel' },
        { slug: 'wiki/wiki' }
      ]
    })
  ]
})
