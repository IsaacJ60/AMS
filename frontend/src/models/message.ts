export interface Player {
  player_id: any;
  player_base_id: number;
  name: any;
  age: number;
  gender: any;
}

export interface PlayerBase {
  base_id: number;
  name: string;
}

export interface Message {
  base_id: number;
  map(arg0: (player: Player) => Player): Player[];
  message: Message | null;
  text: string;
}
