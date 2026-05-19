export interface Spotify {
  album: string;
  album_art_url: string;
  artist: string;
  song: string;
  timestamps: {
    end: number;
    start: number;
  };
  track_id: string;
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

export interface LanyardResponse {
  success: boolean;
  data: {
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
  };
}

export interface WebsocketData {
  op: number;
  d: object;
}
