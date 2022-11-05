import React,{useEffect, useState} from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar
} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { appSelector, appActions } from "../../redux/appRedux";
import api,{IMG_URL} from "../../services/api"
import POKE_IMG from "../../assets/images/poke.png"
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { element } from "prop-types";


const FetchList = () => {
  const dispatch = useDispatch()
  const [pokemons, setPokemons] = useState(null)
  const [next, setNext] = useState(null)
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState(null)

  useEffect(()=>{
    dispatch(appActions.setPageTitle('LISTAS'))
    getPokemons()
  },[])

  const handleClickOpen = async (url) => {
    try {
      //dispatch(appActions.loading(true))
      const result = await api.GET(url)
      if(result){
        console.log('poke data: ', result)
        setData(result)
        setOpen(true)
        
      }
    } catch (error) {
      console.log(error)
    } finally {
      //dispatch(appActions.loading(false))
    }

    
  };
  const handleClose = () => {
   

    setOpen(false);
  };

  const getPokemons = async () => {
    try {
        //dispatch(appActions.loading(true))
        const result = await api.GET(api.pokemons)
        if(result){
          console.log('poke: ', result)
          setPokemons(result.results)
          setNext(result.next)
        }
      } catch (error) {
        console.log(error)
      } finally {
        //dispatch(appActions.loading(false))
      }
  }

  const loadMore = async () => {
    try {
      //dispatch(appActions.loading(true))
      const result = await api.GET(next)
      if(result){
        console.log('poke: ', result)
        setPokemons([...pokemons, ...result.results])
        setNext(result.next)
      }
    } catch (error) {
      console.log(error)
    } finally {
      //dispatch(appActions.loading(false))
    }
  }

  const getPokemonImgId = (id) => {
    console.log('long. '+id.length)
      switch (id.length) {
      case 1:
        return `00${id}`
      case 2:
        return `0${id}`
      default:
        return id
      }
    }

  const renderItem = (item) => {
    const path = item.url.split('/')
    const imgID = getPokemonImgId(path[6])
    return(
      <Card p={2} sx={{ display: 'flex', height:100, cursor:'pointer',
      '&:hover': {backgroundColor: '#5acdbd', color:'white'}}}
      onClick={() => handleClickOpen(item.url)}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            N° {path[6]}
          </Typography>
          <Typography component="div" variant="h5">
            {item.name}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 100 }}
          src={`${IMG_URL}${imgID}.png`}
          alt="Live from space album cover"
        />
      </Card>
    )
  }

 

  return (
    <>
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography component="div" variant="h5">
            {data?data.name:'_'}
          </Typography>
        </Grid>
          {
            pokemons && pokemons.map((p, index)=>{
              return(
                <Grid item xs={4} key={index}>
                {renderItem(p)}
                </Grid>
              )
            })
          }
          <Grid item xs={4} >
            <Card p={2} sx={{ display: 'flex', height:100, cursor:'pointer',
            backgroundColor:'#317b52', '&:hover': {backgroundColor: '#5acdbd'}}}  
            onClick={()=>loadMore()}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5" sx={{color:'white'}}>
                  Cargar Más
                </Typography>
              </CardContent>
              <CardMedia
              component="img"
              sx={{ width: 100, p:2 }}
              image={POKE_IMG}
              alt="Live from space album cover"
              />
            </Card>
          </Grid>
      </Grid>

              <Dialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              >
              <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} sx={{ width: 300, height: 300}}>
                {data?data.name:'_'} <Avatar sx={{ width: 120, height: 120}} src={data?data.sprites.front_default:""}>P</Avatar>
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    
                  >
                    <Typography>Habilidades</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ width: 300, height: 300}}>
                    {data && data.abilities && data.abilities.map((h, index) =>(
                        <Typography key={index}>
                          {h.ability.name}
                        </Typography>
                      )
                    )}
                    

                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Movimientos</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ width: 300, height: 300}}>
                    {data && data.moves && data.moves.map((m, index) =>(
                      <Typography key={index}>
                        {m.move.name}
                      </Typography>
                      )
                    )}
                    

                  </AccordionDetails>
                </Accordion>
              </DialogContent>

            </Dialog>
    </>
      
    );
};

export default FetchList;

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}