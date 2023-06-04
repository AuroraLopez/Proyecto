import React, { useEffect, useState } from 'react';
import { delproduct, getCategorias, newCategoria } from '../firebase/fbgatos'; 
import Button from '@mui/material/Button';
import { ICategoria } from '../Interfaces/gatos';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export const Backend = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>([])
  useEffect(() => {
    getCategorias()
      .then(res => {
        console.log(...res)
        setCategorias([...res])
      })
  }, [])

  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  
  const { register, handleSubmit } = useForm<ICategoria>();

  const onAddCategoria = async (dataCategoria: ICategoria) => {
    console.log(dataCategoria)
    await newCategoria(dataCategoria)
    window.location.reload();
  }

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <h1>Configuración de las razas</h1>
      <main>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display:'flex', justifyContent:'center'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tabla de razas" value="1" />
            <Tab label="Tabla de noticias" value="2" />
          </TabList>
        </Box>
          <TabPanel value="1">
        <Grid container sx={{border: "1px solid black", display: 'flex', justifyContent: 'space-around' }}>
        <TableContainer component={Paper} id='tabla'>
          <h1 id='Razas' style={{border: "1px solid black", fontWeight: 500, letterSpacing: "1px", textAlign:"center"}}>Razas</h1>       
            <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{ backgroundColor: "white" }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 500, letterSpacing: "1px" }} align="center">IMG</TableCell>
                  <TableCell style={{ fontWeight: 500, letterSpacing: "1px" }} align="center">CODIGO</TableCell>
                  <TableCell style={{ fontWeight: 500, letterSpacing: "1px" }} align="center">NOMBRE</TableCell>
                  <TableCell style={{ fontWeight: 500, letterSpacing: "1px" }} align="center">DUEÑOS</TableCell>
                  <TableCell style={{ fontWeight: 500, letterSpacing: "1px" }} align="center">VACUNAS</TableCell>
                  <TableCell align="center"><Button variant="outlined" color="success" onClick={handleToggleCollapse}>
                {isCollapsed ? (
                <LibraryAddIcon sx={{ color: 'green' }} /> ) : (<LibraryAddIcon sx={{ color: 'green' }} />)}Add</Button>
                  </TableCell>
                  <Dialog open={!isCollapsed} onClose={handleToggleCollapse}>
                  <DialogTitle id="new-cat-dialog-title">Añade nueva raza</DialogTitle>
                  <DialogContent>
                  <form onSubmit={handleSubmit(onAddCategoria)} noValidate>
                  <TextField {...register('name')} id='nombre' label='Nick' type='text' sx={{ width: '100%' }} />
                  <TextField {...register('img')} id='img' label='URL' type='text' sx={{ width: '100%' }} />
                  <TextField {...register('dueño')} id='dueño' label='Dueño' type='text' sx={{ width: '100%' }} />
                  <TextField {...register('vacunas')} id='vacunas' label='Nº de vacunas' type='number' sx={{ width: '100%' }} />
                  </form>
                </DialogContent>
                <DialogActions>
              <Button onClick={handleToggleCollapse}>Cancelar</Button>
              <Button type='submit' variant="contained" onClick={handleSubmit(onAddCategoria)}>Añadir</Button>
              </DialogActions>
              </Dialog>
              </TableRow>
              </TableHead>
                    <TableBody >
                        {categorias.map((gatos) => (
                            <TableRow
                                key={gatos.codigo}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center"><img style={{ borderRadius:"30px", border:"1px solid black", width: "10vw", filter: "" }} src={gatos.img} /></TableCell>
                                <TableCell align="center">{gatos.codigo}</TableCell>
                                <TableCell align="center">{gatos.name}</TableCell>
                                <TableCell align="center">{gatos.dueño}</TableCell>
                                <TableCell align="center">{gatos.vacunas}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => gatos.codigo && delproduct(gatos.codigo)}>
                                      <DeleteIcon style={{ color: "red" }} fontSize="large" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
              </Grid>
              </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
         </TabContext>
         </Box>
      </main>
    </>
  )
}
export default Backend;

