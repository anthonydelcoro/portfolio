import type { ImageMetadata } from 'astro';

const TITLE_OVERRIDES: Record<string, string> = {
  arches: 'Arches National Park',
  bryce: 'Bryce Canyon National Park',
  glacier: 'Glacier National Park',
  mt_washington: 'Mount Washington',
  sea_base: 'Florida Sea Base',
  teton: 'Grand Teton National Park',
  tremblant: 'Mount Tremblant',
  yellowstone: 'Yellowstone National Park',
  zion: 'Zion National Park',
};

export function formatAlbumTitle(id: string): string {
  if (TITLE_OVERRIDES[id]) return TITLE_OVERRIDES[id];
  return id
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const thumbnails = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/travel/travel_thumbnails/*.{jpeg,jpg,png,webp}'
);

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/travel/**/*.{jpeg,jpg,png,webp}'
);

function getAlbumIdFromPath(path: string): string | null {
  if (path.includes('travel_thumbnails')) return null;
  const match = path.match(/\/src\/assets\/travel\/([^/]+)\//);
  return match ? match[1] : null;
}

function getThumbnailLoader(
  albumId: string
): (() => Promise<{ default: ImageMetadata }>) | undefined {
  return Object.entries(thumbnails).find(([key]) => {
    const filename = key.split('/').pop()!.replace(/\.\w+$/, '');
    return filename === albumId;
  })?.[1];
}

export interface Album {
  id: string;
  title: string;
  thumbnail: ImageMetadata;
}

export async function getAlbums(): Promise<Album[]> {
  const albumFirstPhoto = new Map<
    string,
    () => Promise<{ default: ImageMetadata }>
  >();

  for (const [path, loader] of Object.entries(allImages)) {
    const id = getAlbumIdFromPath(path);
    if (!id) continue;
    if (!albumFirstPhoto.has(id)) {
      albumFirstPhoto.set(id, loader);
    }
  }

  const albums: Album[] = await Promise.all(
    Array.from(albumFirstPhoto.keys()).map(async (id) => {
      const thumbLoader = getThumbnailLoader(id);
      const thumbnail = thumbLoader
        ? (await thumbLoader()).default
        : (await albumFirstPhoto.get(id)!()).default;
      return {
        id,
        title: formatAlbumTitle(id),
        thumbnail,
      };
    })
  );

  return albums.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getAlbumImages(
  albumId: string
): Promise<ImageMetadata[]> {
  const albumEntries = Object.entries(allImages).filter(
    ([key]) => getAlbumIdFromPath(key) === albumId
  );

  return Promise.all(
    albumEntries.map(async ([, loader]) => (await loader()).default)
  );
}
