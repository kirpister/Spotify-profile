interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface ArtistMore {
  id: string;
  external_urls: { spotify: string };
  name: string;
  type: string;
  images: { url: string }[];
  followers: { url: null; total: number };
  genres: string[];
  popularity: number;
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

interface User {
  id: string;
  display_name: string;
  email: string;
  images: { url: string }[];
}

interface RecentTracks {
  track: {
    album: {
      artists: [
        {
          name: string;
        }
      ];
      images: [
        {
          url: string;
        }
      ];
    };
    name: string;
    id: string;
    track_number: number;
  };
}

export type { Artist, ArtistMore, Track, CurrentTrack, User, RecentTracks };
