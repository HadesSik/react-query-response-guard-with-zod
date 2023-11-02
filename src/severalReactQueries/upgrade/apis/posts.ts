export const POST_USER_1_CORRECT = 'posts?userId=1'

export type TPostUser1CorrectResponse = {
  userId: number
  id: number
  title: string
  body: string
}[]

export const POST_USER_1_WRONG = 'posts?userId=1'

export type TPostUser1WrongResponse = {
  userid: number
  id: string
  title: string
  body: string
}[]
