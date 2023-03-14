import axios, { AxiosInstance } from "axios";
import {
  Artist,
  Track,
  CurrentTrack,
  User,
  ArtistMore,
  RecentTracks,
} from "./Interfaces";

const createAxiosInstance = (token: string): AxiosInstance =>
  axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

const getUserData = async (token: string) => {
  const response = await createAxiosInstance(token).get<User>("/me");
  return response.data;
};

const getCurrentTrack = async (token: string) => {
  const response = await createAxiosInstance(token).get<CurrentTrack>(
    "/me/player/currently-playing"
  );
  return response.data;
};

const getTopTracks = async (token: string, timeRange: string) => {
  const response = await createAxiosInstance(token).get<{ items: Track[] }>(
    `/me/top/tracks?time_range=${timeRange}&limit=10`
  );
  return response.data.items;
};

const getTopArtists = async (token: string, timeRange: string) => {
  const response = await createAxiosInstance(token).get<{ items: Artist[] }>(
    `/me/top/artists?time_range=${timeRange}&limit=10`
  );
  return response.data.items;
};

const getRecentTracks = async (token: string) => {
  const response = await createAxiosInstance(token).get<{
    items: RecentTracks[];
  }>("/me/player/recently-played?limit=10");
  return response.data.items;
};

const getArtistInfo = async (token: string, id: string) => {
  const response = await createAxiosInstance(token).get<ArtistMore>(
    `/artists/${id}`
  );
  return response.data;
};

export {
  getUserData,
  getArtistInfo,
  getCurrentTrack,
  getTopArtists,
  getTopTracks,
  getRecentTracks,
};
