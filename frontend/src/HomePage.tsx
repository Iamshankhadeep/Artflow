import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {randomIntFromInterval} from './helper'
import {ListingCard} from './ListingCard'
import {PostResponse} from './type'

import {UserResponse} from './type'
const HomePage: React.FC<{user: UserResponse}> = ({user}) => {
    const [posts, setPosts] = useState<PostResponse | null>(null)

    const getARandomImage = async() => {
        const res = await fetch('https://picsum.photos/v2/list?page=2&limit=200')
        const json = await res.json()
        const randomNumber = randomIntFromInterval(0, json.length - 1)
        console.log(json[randomNumber],'randomNumber')
        const createPostResponse = await fetch('http://localhost:5002/post', {
            method: 'POST',
            body: JSON.stringify({
                user_id: user.user.id,
                image_url: json[randomNumber].download_url,
                title: json[randomNumber].author
            })
        })
        const createPostResponseJson = await createPostResponse.json()
        console.log(createPostResponseJson, 'createPostResponseJson')
        await getPosts()
    }

    const getPosts = async() => {
        const res = await fetch('http://localhost:5002/post')
        const json = await res.json()
        console.log(json,'posts')
        setPosts(json)
    }
    useEffect(()=>{
        getPosts()
    },[])
    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h1" component="h1" gutterBottom>
                    Logged in as 
                </Typography>
                <Typography variant="h3" component="h3" gutterBottom>
                    {user.user.email}
                </Typography>
                <Button variant="contained" onClick={getARandomImage}>Create A Image</Button>
            </Box>
            <Typography>
                {posts && <ListingCard posts={posts} />}
            </Typography>
        </Container>
    )
}

export {HomePage}