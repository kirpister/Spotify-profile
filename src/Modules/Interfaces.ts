interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface ArtistMore {
  id: string;
  name: string;
  type: string;
  images: { url: string }[];
  followers: number;
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
    name: string;
    id: string;
    track_number: number;
  };
}


export type { Artist, ArtistMore, Track, CurrentTrack, User, RecentTracks };

