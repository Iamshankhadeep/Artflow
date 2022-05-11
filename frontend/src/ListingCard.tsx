import React from 'react';
import { CardActionArea, Card, Grid, CardMedia, CardContent, Box, Typography, Divider, CardActions, IconButton } from '@mui/material';
import {FavoriteBorder} from '@mui/icons-material'
import {PostResponse, UserResponse, Post} from './type'

const ListingCard: React.FC<{posts: PostResponse, user: UserResponse, getPosts: () => Promise<void> }> = ({posts, user, getPosts}) => {

    const onLikeButtonClick = async (post: Post) => {
      const isPostLikedByUser = isPostLiked(post)
      if(!isPostLikedByUser){
        const createLikeResponse = await fetch('http://localhost:8000/like', {
            method: 'POST',
            body: JSON.stringify({
                user_id: user.user.id,
                post_id: post.id
            })
        })
        await createLikeResponse.json()
      } else {
        const likedPost = post.liked_by_users.find(like => like.user_id === user.user.id)
        const createLikeResponse = await fetch('http://localhost:8000/like', {
            method: 'DELETE',
            body: JSON.stringify({
                like_id: likedPost?.id
            })
        })
        const createLikeResponseJson = await createLikeResponse.json()
        console.log(createLikeResponseJson, 'createLikeResponseJsonDelet')
      }
      await getPosts()
    }

    const isPostLiked = (post: Post) => {
      if(post.liked_by_users.findIndex(like => like.user_id === user.user.id) !== -1){
        return true
      }
      return false
    }

    return (
        <Grid container spacing={1} sx={{margin:'20px'}}>
          {posts.posts.map((card) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={card.id}
            >
              <Card>
                <CardActionArea onClick={()=>{}}>
                  <CardMedia
                    image={card.image_url}
                    sx={{height:'200px',width:'100%'}}
                  />
                  <CardContent>
                    <Box
                      component="div"
                      overflow="hidden"
                      whiteSpace="pre-line"
                      textOverflow="ellipsis"
                      height={50}
                    >
                        <Typography variant="h6" component="h6" sx={{fontSize: '18px'}}>
                            {card.title}
                        </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
                <Divider />
                <CardActions disableSpacing>
                  <IconButton onClick={()=>{
                    onLikeButtonClick(card)
                  }}>
                    <FavoriteBorder style={isPostLiked(card)?{fill:'red'}:{}}/>
                    <Typography variant="h6" component="h6" sx={{fontSize: '18px'}}>
                      {card.liked_by_users.length } likes
                      </Typography>.
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
    )
}

export {ListingCard}
