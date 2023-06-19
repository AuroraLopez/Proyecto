import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ICategoria } from '../../Interfaces/gatos';
import { getCategorias } from '../../firebase/fbgatos';
import { CardActionArea } from '@mui/material';

import './razas.css';

export const Razas = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => {
    getCategorias()
      .then(res => {
        console.log(...res);
        setCategorias([...res]);
      });
  }, []);

  const handleCardClick = (id: string | undefined) => {
    if (id) {
      setExpandedCard(id === expandedCard ? null : id);
    }
  };

  return (
    <>
      <h1>Razas</h1>
      <main id='api' style={{ padding: '20px' }}>
        <Grid className='apigrid' container style={{ margin: '1px solid black', display: 'flex', justifyContent: 'center', padding: '40px' }}>
          {categorias.map((categoria) => (
            <Card
              sx={{
                maxWidth: 300,
                margin: '20px',
                transform: expandedCard === categoria.codigo ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.3s',
              }}
              key={categoria.codigo}
              onClick={() => handleCardClick(categoria.codigo)}
            >
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='140'
                  image={categoria.img}
                  alt=''
                  style={{ width: '200px', height: '200px' }}
                />
                <CardContent>
                  <Typography gutterBottom variant='h4' component='div'>
                    {categoria.name}
                  </Typography>
                  {expandedCard === categoria.codigo ? (
                    <>
                      <Typography gutterBottom variant='h6' component='div'>
                        {categoria.dueño}
                      </Typography>
                      <Typography gutterBottom variant='h6' component='div'>
                        {categoria.vacunas}
                      </Typography>
                      <Typography gutterBottom variant='h6' component='div'>
                        {categoria.descripcion}
                      </Typography>
                    </>
                  ) : null}
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </main>
    </>
  );
};
