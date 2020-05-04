export interface IUser {
  id: number,
  name: string,
}

export interface IComment {
  id: number,
  text: string,
  user: number,
}

export interface IPost {
  id: number,
  thema: string,
  text: string,
  user: number,
  comments: number[],
}
