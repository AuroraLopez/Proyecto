import React from 'react'
import { Button, Grid, TextField } from "@mui/material";
import { NavLink } from 'react-router-dom'
import './Contactanos.css'

export const Login  = () => {
   return (
    <>
      <h1>Login</h1>
      <main className="general">
        <form className="login-form">
          <Grid container spacing={2}>
            <h3>Login</h3>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                type="text"
                fullWidth
                label="Email"
                sx={{ mt: 1, mb: 1.5 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                type="password"
                fullWidth
                label="Contraseña"
                sx={{ mt: 1, mb: 1.5 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                component={NavLink}
                to="../rr"
              >
                Iniciar Sesión
              </Button>
            </Grid>
          </Grid>
        </form>
      </main>
    </>
  );
};