import { defineCollection } from "astro:content";
import { type Loader } from "astro/loaders";
import { z } from "astro/zod";

const COLLECTION_MBID = "ac967ecd-6461-4f18-889e-bd84a75d82fc";

interface MusicbrainzResponse {
  "release-count": number;
  releases: MusicbrainzRelease[];
}

interface MusicbrainzRelease {
  id: string;
  title: string;
  date: string;
  "artist-credit": {
    name: string;
  }[];
}

const musicLoader: Loader = {
  name: "music-loader",
  async load({ store, parseData, generateDigest }) {
    const res = await (await fetch(`https://musicbrainz.org/ws/2/release?inc=artist-credits&collection=${COLLECTION_MBID}`, {
      headers: {
        "User-Agent": "towel.codes/0.1.0 (tea@towel.codes)",
        "Accept": "application/json",
      }
    })).json() as MusicbrainzResponse;

    const albums = [];

    const releases = res.releases;
    for (const release of releases) {
      let artist = "";
      for (const [key, value] of release["artist-credit"].entries()) {
        artist += (key == 0 ? "" : ", ") + value.name;
      }

      const data = {
        title: release.title,
        artist: artist,
        date: release.date,
        cover: `/music/cover/${release.id}`,
      };
      store.set({
        id: release.id,
        data,
        digest: generateDigest(JSON.stringify(data)),
      })
    }
  }
};

const music = defineCollection({
  loader: musicLoader,
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    date: z.string(),
    cover: z.string(),
  }),
});

export const collections = { music };
