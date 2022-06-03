export interface IRecipe {
  name: string
}

export interface IUser {
  _id: string
  name: string
}

export interface IComment {
  _id: string
  user: IUser
  body: string
  created_at: Date
}
