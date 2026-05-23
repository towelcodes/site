export interface Spotify {
  album?: string;
  album_art_url?: string;
  artist: string;
  song: string;
  timestamps?: {
    end: number;
    start: number;
  };
  track_id?: string;
}

export interface Activity {
  id: string;
  name: string;
  state: string;
  details: string;
  timestamps: {
    end: number;
    start: number;
  };
  assets: {
    large_image: string;
    large_text: string;
    small_image: string;
    small_text: string;
  };
}

export interface NowPlayingResponse {
  payload: {
    count: number;
    listens: {
      playing_now: boolean;
      track_metadata: {
        additional_info: {
          duration_ms: number;
          media_player: string;
        };
        artist_name: string;
        track_name: string;
        release_name?: string;
      };
    }[];
  };
}

export interface LanyardResponse {
  discord_user: {
    avatar: string;
    display_name: string;
    global_name: string;
    id: string;
    username: string;
    primary_guild?: string;
  };
  activities: Activity[];
  discord_status: string;
  listening_to_spotify: boolean;
  spotify?: Spotify;
}

export const defaultLanyardResponse: LanyardResponse = {
  discord_user: {
    avatar: "",
    display_name: "",
    global_name: "",
    id: "",
    username: "",
  },
  activities: [],
  discord_status: "offline",
  listening_to_spotify: false,
};

export interface WebsocketData {
  op: number;
  d: object;
  t?: string;
}

export interface WebsocketHello {
  heartbeat_interval: number;
}
