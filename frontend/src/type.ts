export type User = {
    id: number,
    email: string
  }
  
export type UserResponse = {
    user: User
}
  
export type Users = User[]

export type LikeNotification = {
    id: number,
    user_id: number,
    post_id: number,
}

export type Post = {
    date_posted: string,
    id: number,
    image_url: string,
    title: string,
    user_id: number,
    liked_by_users: LikeNotification[]
}

export type PostResponse = {
    posts: Post[]
}

export type LikeEvent = {
    post: Post,
    user: User
}
  
