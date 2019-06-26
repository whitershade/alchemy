export type Card = {
  id: number;
  name: string;
  description?: string;
  order: number;
  playerId: number;

  createdAt: Date;
  updatedAt: Date;
};

export type Cards = Card[];

export type Player = {
  id: number;
  name: string;

  cards: Cards;

  createdAt: Date;
  updatedAt: Date;
}

export type Players = {
  [id:number]: Player;
}