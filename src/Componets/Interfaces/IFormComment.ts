export interface IFormComment {
  showFormComent(): void,
  postId: number,
  comments: number[],
}

export interface IDataComment {
  userName: string,
  textComent: string,
}
