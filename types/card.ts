export type Card = {
  question: string
  answer: string
}

export type Cardset = {
  id: string
  name: string
  cards: Card[]
}
