export type Card = {
  id: number,
  name: string,
  description?: string,

  createdAt: Date;
  updatedAt: Date;
};

export type Player = {
  id: number,
  name: string,

  cards: {
    [id: number]: Card;
  },

  createdAt: Date;
  updatedAt: Date;
}

export type Players = {
  [id:number]: Player
}