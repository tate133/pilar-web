import * as React from "react";
import {Grid,Paper,Box, Button} from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { appSelector, appActions } from "../../redux/appRedux";


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { NavLink } from "react-router-dom";

function ActionAreaCardTodo() {
  return (
    <Card sx={{ maxWidth: 550 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={require('../../assets/images/green-iguana.jpg')}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
            <NavLink to="/todo" >
                <Button size="small" color="primary">
                todo
                </Button>
            </NavLink>
      </CardActions>
    </Card>
  );
}

function ActionAreaCardFetchList() {
    return (
      <Card sx={{ maxWidth: 550 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={require('../../assets/images/green-iguana.jpg')}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over 6,000
              species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
            <NavLink to="/fetch-list" >
                <Button size="small" color="primary">
                fetchlist
                </Button>
            </NavLink>
        </CardActions>
      </Card>
    );
  }


const Dashboard = () => {
  const lista = useSelector(appSelector.todo);
  let total = lista.length;
  let contTrue = 0;
  let contFalse = 0;

    return (
      <>
        {lista.forEach(t => {

              if(t.completed == true){
                  contTrue = contTrue+1
              }else{
                contFalse = contFalse+1
              }

            })
        }
        
        <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
                <Paper sx={{p: 2}}>
                    <Box>
                        <h2>Total de tareas {total}</h2>
                        <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md:3}}>
                            <Grid item xs={6}>
                                    <Typography variant="h5" component="div">
                                        Tareas Realizas {contTrue}
                                    </Typography>
                                    {ActionAreaCardTodo()}
                            </Grid>
                            <Grid item xs={6}>
                                    <Typography variant="h5" component="div">
                                        Tareas Pendientes {contFalse}
                                    </Typography>
                                    {ActionAreaCardFetchList()}
                            </Grid>
                        </Grid>
                        
                    </Box>
                        
                        
                </Paper>
            </Grid>
        </Grid>


        
      </>
    );
};

export default Dashboard;