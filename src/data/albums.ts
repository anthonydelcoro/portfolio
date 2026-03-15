export interface Album {
  /** Folder name in src/assets/travel/ and thumbnail filename in travel_thumbnails/ */
  id: string;
  title: string;
  /** Page slug within the travel/ directory */
  slug: string;
  year: number;
}

/**
 * To add a new album:
 * 1. Add photos to src/assets/travel/{id}/
 * 2. Add a thumbnail to src/assets/travel/travel_thumbnails/{id}.jpg
 * 3. Add an entry here
 * 4. Create a new MDX page in src/content/docs/travel/
 * 5. Add the page slug to the sidebar in astro.config.mjs
 */
export const albums: Album[] = [
  { id: 'arches', title: 'Arches National Park', slug: 'arches-national-park', year: 2025 },
  { id: 'ireland', title: 'Ireland', slug: 'ireland', year: 2024 },
  { id: 'iceland', title: 'Iceland', slug: 'iceland', year: 2023 },
  { id: 'spain', title: 'Spain', slug: 'spain', year: 2022 },
  { id: 'tremblant', title: 'Mount Tremblant', slug: 'mount-tremblant', year: 2022 },
  { id: 'glacier', title: 'Glacier National Park', slug: 'glacier-national-park', year: 2021 },
  { id: 'yellowstone', title: 'Yellowstone National Park', slug: 'yellowstone-national-park', year: 2021 },
  { id: 'teton', title: 'Grand Teton National Park', slug: 'grand-teton-national-park', year: 2021 },
  { id: 'sea_base', title: 'Florida Sea Base', slug: 'florida-sea-base', year: 2021 },
  { id: 'mt_washington', title: 'Mount Washington', slug: 'mount-washington', year: 2021 },
  { id: 'bryce', title: 'Bryce Canyon National Park', slug: 'bryce-canyon-national-park', year: 2020 },
  { id: 'zion', title: 'Zion National Park', slug: 'zion-national-park', year: 2020 },
  { id: 'morocco', title: 'Morocco', slug: 'morocco', year: 2019 },
  { id: 'portugal', title: 'Portugal', slug: 'portugal', year: 2019 },
  { id: 'tulum', title: 'Tulum', slug: 'tulum', year: 2018 },
  { id: 'ecuador', title: 'Ecuador', slug: 'ecuador', year: 2018 },
];
