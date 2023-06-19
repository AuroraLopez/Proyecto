import React, { useEffect, useState } from 'react';
import { cargarprod, delproduct, getCategorias, newCategoria } from '../firebase/fbgatos'; 
import Button from '@mui/material/Button';
import { Comidas, ICategoria } from '../Interfaces/gatos';
import Grid from '@mui/material/Grid';
import { TextField, colors } from '@mui/material';
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
import { delcomida, getComidas, newComida } from '../firebase/fbcomidas';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';


export const Backend = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>([])
  useEffect(() => {
    getCategorias()
      .then(res => {
        console.log(...res)
        setCategorias([...res])
      })
  }, [])
  const [comidacategorias, setComida] = useState<Comidas[]>([]);

  useEffect(() => {
    getComidas()
      .then(res => {
        console.log(...res);
        setComida([...res]);
      });
  }, []);
  
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

  const { register: registercomida, handleSubmit: handleSubmitcomida } = useForm<Comidas>();

  const onAddComida = async (dataComida: Comidas) => {
    console.log(dataComida)
    await newComida(dataComida)
    window.location.reload();
  }

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const [editing, setEditing] = useState(false);

  const handleToggleEditing = () => {
    setEditing(!editing);
  };
          
  return (
    <>
      <h1 id='h1logout' style={{display:'flex', justifyContent:'space-between', padding:'10px 50px 10px 80px'}}>Configuración de las razas <Button variant="outlined" component={NavLink} to="/"> Logout <LogoutIcon /></Button></h1>
      <main>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display:'flex', justifyContent:'center'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Tabla de razas" value="1" />
            <Tab label="Tabla de comidas" value="2" />
          </TabList>
        </Box>
          <TabPanel value="1">
          <Button variant='contained' onClick={cargarprod}>Cargar</Button> 
        <Grid container sx={{border: "1px solid black", display: 'flex', justifyContent: 'space-around' }}>
        <TableContainer component={Paper} id='tabla'>
          <h1 id='Razas' style={{border: "1px solid black", fontWeight: 500, letterSpacing: "1px", textAlign:"center"}}>Razas</h1>      
 <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 500, letterSpacing: '1px' }} align="center">
              IMG
            </TableCell>
            <TableCell style={{ fontWeight: 500, letterSpacing: '1px' }} align="center">
              CODIGO
            </TableCell>
            <TableCell style={{ fontWeight: 500, letterSpacing: '1px' }} align="center">
              NOMBRE
            </TableCell>
            <TableCell style={{ fontWeight: 500, letterSpacing: '1px' }} align="center">
              DUEÑOS
            </TableCell>
            <TableCell style={{ fontWeight: 500, letterSpacing: '1px' }} align="center">
              VACUNAS
            </TableCell>
            <TableCell style={{ fontWeight: 500, letterSpacing: '1px' }} align="center">
              DESCRIPCIÒN
            </TableCell>
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
                  <TextField {...register('descripcion')} id='descripcion' label='Descripcion' type='string' sx={{ width: '100%' }} />
                  </form>
                </DialogContent>
                <DialogActions>
              <Button onClick={handleToggleCollapse}>Cancelar</Button>
              <Button type='submit' variant="contained" onClick={handleSubmit(onAddCategoria)}>Añadir</Button>
              </DialogActions>
              </Dialog>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorias.map((gatos) => (
            <TableRow key={gatos.codigo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell id="imgGatos" align="center" contentEditable={editing}>
                {editing ? (
                  <input type="text" value={gatos.img} />
                ) : (
                  <img
                    style={{ borderRadius: '30px', border: '1px solid black', width: '10vw', filter: '' }}
                    src={gatos.img}
                  />
                )}
              </TableCell>
              <TableCell id="codigoGatos" align="center" contentEditable={editing}>
                {editing ? (
                  <input type="text" value={gatos.codigo} />
                ) : (
                  gatos.codigo
                )}
              </TableCell>
              <TableCell id="nombreGatos" align="center" contentEditable={editing}>
                {editing ? (
                  <input type="text" value={gatos.name} />
                ) : (
                  gatos.name
                )}
              </TableCell>
              <TableCell id="dueñosGatos" align="center" contentEditable={editing}>
                {editing ? (
                  <input type="text" value={gatos.dueño} />
                ) : (
                  gatos.dueño
                )}
              </TableCell>
              <TableCell id="vacunasGatos" align="center" contentEditable={editing}>
                {editing ? (
                  <input type="number" value={gatos.vacunas} />
                ) : (
                  gatos.vacunas
                )}
              </TableCell>
              <TableCell id="descripcionGatos" align="center" contentEditable={editing}>
                {editing ? (
                  <input type="descripcion" value={gatos.vacunas} />
                ) : (
                  gatos.descripcion
                )}
              </TableCell>
              <TableCell align="center">
              <Button  onClick={handleToggleEditing}>
                {editing ? (
                    <SettingsIcon sx={{color:'grey'}} fontSize="large" />
                  ) : (
                    <SettingsIcon sx={{color:'grey'}} fontSize="large" />
                )}
              </Button>
                <Button onClick={() => gatos.codigo && delproduct(gatos.codigo)}>
                  <DeleteIcon style={{ color: 'red' }} fontSize="large" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
                </Table>
            </TableContainer>
              </Grid>
              </TabPanel>
            <TabPanel value="2">
            <Grid container sx={{border: "1px solid black", display: 'flex', justifyContent: 'space-around' }}>
        <TableContainer component={Paper} id='tabla'>
          <h1 id='Razas' style={{border: "1px solid black", fontWeight: 500, letterSpacing: "1px", textAlign:"center"}}>Razas</h1>       
 <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 500, letterSpacing: '1px' }} align="center">
              IMG
            </TableCell>
            <TableCell style={{ fontWeight: 500, letterSpacing: '1px' }} align="center">
              CODIGO
            </TableCell>
            <TableCell style={{ fontWeight: 500, letterSpacing: '1px' }} align="center">
              NOMBRE
            </TableCell>
            <TableCell style={{ fontWeight: 500, letterSpacing: '1px' }} align="center">
              DESCRIPCIÓN
            </TableCell>
            <TableCell style={{ fontWeight: 500, letterSpacing: '1px' }} align="center">
              DATO
            </TableCell>
            <TableCell align="center">
  <Button variant="outlined" color="success" onClick={handleToggleCollapse}>
    {isCollapsed ? (
      <LibraryAddIcon sx={{ color: 'green' }} />
    ) : (
      <LibraryAddIcon sx={{ color: 'green' }} />
    )}
    Add
  </Button>
</TableCell>
<Dialog open={!isCollapsed} onClose={handleToggleCollapse}>
  <DialogTitle id="new-cat-dialog-title">Añade nueva raza</DialogTitle>
  <DialogContent>
    <form onSubmit={handleSubmitcomida(onAddComida)} noValidate>
      <TextField {...registercomida('name')} id='nombre' label='Nombre' type='text' sx={{ width: '100%' }} />
      <TextField {...registercomida('img')} id='img' label='URL' type='text' sx={{ width: '100%' }} />
      <TextField {...registercomida('dato')} id='dato' label='dato' type='text' sx={{ width: '100%' }} />
      <TextField {...registercomida('descripcion')} id='descripcion' label='Descripción' type='text' sx={{ width: '100%' }} />
      <DialogActions>
        <Button onClick={handleToggleCollapse}>Cancelar</Button>
        <Button type='submit' variant="contained">Añadir</Button>
      </DialogActions>
    </form>
  </DialogContent>
</Dialog>

          </TableRow>
        </TableHead>
        <TableBody>
          {comidacategorias.map((comida) => (
            <TableRow key={comida.codigo} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell id="imgComida" align="center" contentEditable={editing}>
                {editing ? (
                  <input type="text" value={comida.img} />
                ) : (
                  <img
                    style={{ borderRadius: '30px', border: '1px solid black', width: '10vw', filter: '' }}
                    src={comida.img}
                  />
                )}
              </TableCell>
              <TableCell id="codigoComida" align="center" contentEditable={editing}>
                {editing ? (
                  <input type="text" value={comida.codigo} />
                ) : (
                  comida.codigo
                )}
              </TableCell>
              <TableCell id="nombreComida" align="center" contentEditable={editing}>
                {editing ? (
                  <input type="text" value={comida.name} />
                ) : (
                  comida.name
                )}
              </TableCell>
              <TableCell id="datoComida" align="center" contentEditable={editing}>
                {editing ? (
                  <input type="text" value={comida.dato} />
                ) : (
                  comida.dato
                )}
              </TableCell>
              <TableCell id="DescripcionComida" align="center" contentEditable={editing}>
                {editing ? (
                  <input type="number" value={comida.descripcion} />
                ) : (
                  comida.descripcion
                )}
              </TableCell>
              <TableCell align="center">
              <Button onClick={handleToggleEditing}>
                {editing ? (
                  <SettingsIcon sx={{color:'grey'}} fontSize="large" />
                ) : (
                  <SettingsIcon sx={{color:'grey'}} fontSize="large" />
                )}
              </Button>
                <Button onClick={() => comida.codigo && delcomida(comida.codigo)}>
                  <DeleteIcon style={{ color: 'red' }} fontSize="large" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
                </Table>
            </TableContainer>
              </Grid>
            </TabPanel>
         </TabContext>
         </Box>
      </main>
    </>
  )
}
export default Backend;

