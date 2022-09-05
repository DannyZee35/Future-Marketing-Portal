import { Box, Typography, Grid, Container, Stack, Button, CssBaseline, TextField, FormControlLabel } from "@mui/material"
import { useState } from "react"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "./firebaseConfig";

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("sign in successs");
        if (email == "usersa15@gmail.com") {
          navigate('/sascreen/dashboard')
        }
        if (email == "useradmin@gmail.com") {
          navigate('/adminscreen/admindashboard')
        }
        if (email == "userspeedyhousing@gmail.com") {
          navigate('/speedyhousing/speedydashboard')

        }

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{
        border: '1px solid blue', mt: 10, borderRadius: '10px',
        boxShadow: '1px 2px 9px #6c8bf9',
      }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5" align="left" sx={{ fontWeight: 'bold' }}>
            Welcome To
          </Typography>

          <Typography component="h1" variant="h5" sx={{ fontFamily: "Mogra, cursive" }} color={"primary"}>
            Future Marketing Portal
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

          </Box>
        </Box>

      </Container>


    </>
  )
}