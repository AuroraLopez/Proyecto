import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ICategoria } from '../../Interfaces/gatos';
import { getCategorias, newCategoria } from '../../firebase/fbgatos';
import { CardActionArea } from '@mui/material';

import './razas.css'

export const Razas = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);

  useEffect(() => {
    getCategorias()
      .then(res => {
        console.log(...res);
        setCategorias([...res]);
      });
  }, []);

  return (
    <>
    <h1>Razas</h1>
    <main id='api' style={{ padding: '20px' }}>
  <Grid className='apigrid' container style={{margin: '1px solid black', display: 'flex', justifyContent: 'center', padding:'40px' }}>
    {categorias.map((categoria) => (
      <Card sx={{ maxWidth: 400, margin: '20px' }}>
        <CardActionArea>
          <CardMedia
            component='img'
            height='140'
            image={categoria.img}
            alt=''
            style={{ width: '200px', height: '200px' }}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {categoria.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ))}
  </Grid>
</main>
    </>
  );
};

