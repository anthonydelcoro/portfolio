import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://anthonydelcoro.github.io',
  base: '/portfolio',
  integrations: [
    starlight({
      title: 'Anthony Del Coro',
      components: {
        Head: './src/components/Head.astro',
        Header: './src/components/Header.astro',
        TwoColumnContent: './src/components/TwoColumnContent.astro',
        SidebarSublist: './src/components/SidebarSublist.astro',
        SidebarPersister: './src/components/SidebarPersister.astro',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Home', link: '/' },
        { slug: 'resume' },
        { slug: 'contact' },
        {
          label: 'Projects',
          collapsed: true,
          items: [
            { slug: 'projects/projects' },
            { slug: 'projects/astrobotics' },
            { slug: 'projects/in-space-additive-manufacturing' },
            { slug: 'projects/vex-robotics' },
            { slug: 'projects/eagle-scout' },
          ],
        },
        { label: 'Travel', link: '/travel/' },
        { slug: 'reading' },
        { slug: 'wiki/wiki' }
      ]
    })
  ]
})
