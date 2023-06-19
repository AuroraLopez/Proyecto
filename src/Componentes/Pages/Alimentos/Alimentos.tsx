import React, { useEffect, useState } from 'react';
import { Grid, colors } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Comidas } from '../../Interfaces/gatos';
import { getComidas } from '../../firebase/fbcomidas';

export const Alimentos = () => {
    const [comidacategorias, setComida] = useState<Comidas[]>([]);

    useEffect(() => {
      getComidas()
        .then(res => {
          console.log(...res);
          setComida([...res]);
        });
    }, []);
    


  return (
    <>
    <h1>Alimentos</h1>
    <main id='api' style={{ padding: '20px' }}>
    <h2 id='h2alimentos' style={{textAlign:'center', color:'lightblue', borderColor:'blue'}} >Aqui vamos a ver la comida que es buena o mala para nuestros minino</h2>
  <Grid className='apigrid2' container style={{margin: '1px solid black', display: 'flex', justifyContent: 'center', padding:'40px' }}>
    {comidacategorias.map((categoria) => (
      <Card sx={{ maxWidth: 900, margin: '20px' }}>
          <CardMedia
            component='img'
            height='140'
            image={categoria.img}
            alt=''
            style={{ width: '450px', height: '250px' }}
          />
          <CardContent>
            <Typography gutterBottom variant='h4' component='div'>
              {categoria.name}
            </Typography>
            <Typography gutterBottom variant='h6' component='div'>
              {categoria.descripcion}
            </Typography>
            <Typography gutterBottom variant='h6' component='div'>
              {categoria.dato}
            </Typography>
          </CardContent>
      </Card>
    ))}
  </Grid>
</main>
    </>
  );
};

