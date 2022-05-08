export type User = {
    id: number,
    email: string
  }
  
export type UserResponse = {
    user: User
}
  
export type Users = User[]

export type Posts = {
    date_posted: string,
    id: number,
    image_url: string,
    title: string,
    user_id: number
}

export type PostResponse = {
    posts: Posts[]
}
  
