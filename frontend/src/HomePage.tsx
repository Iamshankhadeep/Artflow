import React, {useEffect, useState} from 'react';
import socketIOClient, {Socket} from 'socket.io-client';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar, {SnackbarOrigin} from '@mui/material/Snackbar';
import {randomIntFromInterval} from './helper'
import {ListingCard} from './ListingCard'
import {PostResponse, Post, UserResponse, LikeEvent} from './type'

export interface State extends SnackbarOrigin {
    open: boolean;
  }

const HomePage: React.FC<{user: UserResponse}> = ({user}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [posts, setPosts] = useState<PostResponse | null>(null)
    const [message, setMessage] = useState<string>('')
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'bottom',
        horizontal: 'left',
      });
      const { vertical, horizontal, open } = state;
    
      const handleClose = () => {
        setState({ ...state, open: false });
        setMessage('')
      };

    const getARandomImage = async() => {
        const res = await fetch('https://picsum.photos/v2/list?page=2&limit=200')
        const json = await res.json()
        const randomNumber = randomIntFromInterval(0, json.length - 1)
        const createPostResponse = await fetch('http://localhost:8000/post', {
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
        const res = await fetch('http://localhost:8000/post')
        const json = await res.json()
        console.log(json,'posts')
        setPosts(json)
    }

    useEffect(()=>{
        getPosts()
    },[])

    useEffect(() => {
        const socket = socketIOClient(`http://localhost:8000/`,{
            transports: ['websocket'],
        });

        socket.on('like_event', (data: LikeEvent) => {
            if(data.post.user_id === user.user.id){
                if(data.user.id === user.user.id){
                    setMessage(`You liked your post titled ${data.post.title}`)
                }
                else{
                    setMessage(`${data.user.email} liked your post titled ${data.post.title}`)
                }
                setState({ ...state, open: true });
            }
            if(posts){
                const allPosts = posts.posts
                const updatedPost: Post[] = allPosts.map(post => {
                    if(post.id === data.post.id){
                        return data.post
                    }
                    return post
                })
                setPosts({posts: updatedPost})
            }
            console.log(data, 'like_event')
        })

        socket.on('connect', () => {
            console.log('connected')
        })
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${JSON.stringify(err.message  )}`);
        });
        setSocket(socket)
      }, []);

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
                {posts && <ListingCard posts={posts} user={user} getPosts={getPosts}/>}
            </Typography>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={message}
                key={vertical + horizontal}
            />
        </Container>
    )
}

export {HomePage}