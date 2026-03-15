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
        {
          label: 'Travel',
          collapsed: true,
          items: [
            { slug: 'travel/travel' },
            { slug: 'travel/tulum' },
            { slug: 'travel/ecuador' },
            { slug: 'travel/morocco' },
            { slug: 'travel/portugal' },
            { slug: 'travel/bryce-canyon-national-park' },
            { slug: 'travel/zion-national-park' },
            { slug: 'travel/glacier-national-park' },
            { slug: 'travel/yellowstone-national-park' },
            { slug: 'travel/grand-teton-national-park' },
            { slug: 'travel/florida-sea-base' },
            { slug: 'travel/mount-washington' },
            { slug: 'travel/spain' },
            { slug: 'travel/mount-tremblant' },
            { slug: 'travel/iceland' },
            { slug: 'travel/ireland' },
            { slug: 'travel/arches-national-park' },
          ],
        },
        { label: 'Photo Gallery', link: '/gallery/' },
        { slug: 'reading' },
        { slug: 'wiki/wiki' }
      ]
    })
  ]
})
