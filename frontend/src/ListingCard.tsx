import React from 'react';
import { CardActionArea, Card, Grid, CardMedia, CardContent, Box, Typography, Divider, CardActions, IconButton } from '@mui/material';
import {FavoriteBorder} from '@mui/icons-material'
import {PostResponse} from './type'

const ListingCard: React.FC<{posts: PostResponse}> = ({posts}) => {

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
                  <IconButton onClick={()=>{}}>
                    <FavoriteBorder />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
    )
}

export {ListingCard}
