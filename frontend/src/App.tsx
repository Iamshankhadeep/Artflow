import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {HomePage} from './HomePage'

import {UserResponse} from './type'

function App() {

  const [user, setUsers] = useState<UserResponse | null>(null)
  const [email, setEmail] = React.useState<string>('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    fetch('http://localhost:8000/login', {
      method: 'POST',
      body: JSON.stringify({
        email
      })
    }).then((res) => res.json())
    .then((json) => {
      console.log(json)
      setUsers(json)
    })

  }

  console.log(user)
  if(user){
    return <HomePage user={user} />
  }
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Login
        </Typography>
      </Box>
      <Box sx={{ display:'flex',flexDirection: 'column', justifyContent:'center', alignItems:'center' }} >
        <TextField id="outlined-basic" label="Type Your Email Id" variant="outlined" sx={{margin:'10px', width:'300px'}} value={email} onChange={handleChange}/>
        <Button variant="contained" onClick={handleSubmit}>Log In</Button>
      </Box>
    </Container>
  );
}

export default App;
