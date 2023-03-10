interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  album: { images: { url: string }[] };
  artists: { name: string }[];
}

interface CurrentTrack {
  item: {
    name: string;
    artists: { name: string }[];
  };
}

export type { Artist, Track, CurrentTrack };
