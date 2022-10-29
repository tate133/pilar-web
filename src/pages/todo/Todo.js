import React, {useEffect, useState} from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Stack,
  CardHeader,
  Typography,
  Checkbox
} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useSelector, useDispatch } from "react-redux";
import { appSelector, appActions } from "../../redux/appRedux";
import { v4 as uuid } from 'uuid';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="elevation">{card}</Card>
    </Box>
  );
}

const Todo = () => {
  const dispatch = useDispatch()
  const todo = useSelector(appSelector.todo)
  const [text, setText] = useState(null)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleChecked = (e, id) => {
    dispatch(appActions.setCompletedTodo({id, completed: e.target.checked}))
  }
  
  const addTask = ()=> {
    dispatch(appActions.addTodo({text: text, id: uuid() }));
    setText(null);
  }

  const delTask = (id) => {
      dispatch(appActions.deleteTodo(id))
  }

    return (
      <>
        <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <Card>
                <CardHeader title="Agrega una tarea" />
                <CardContent>
                  
                  <Grid container spacing={2}>
                      <Grid item md={3}>
                        <TextField value={text} label="tarea" variant="outlined"
                        onChange={handleChange} />
                      </Grid>
                      <Grid item md={9}>
                        <Button disabled={!text} variant="contained"
                        onClick={()=>addTask()}>Agregar</Button>
                      </Grid>
                    </Grid>
                  
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={12} xs={12}>
              <Card>
                <CardHeader title="Tareas" />
                <CardContent>
                  {todo.map((t, index)=>
                  (
                    <Stack key={t.id} sx={{justifyContent:'space-between'}} direction='row'>
                      <Grid item md={0}>
                        <Checkbox onChange={e=>handleChecked(e,t.id)} />
                      </Grid>
                      <Grid item md={4} sx={{pt: 1}}>
                        <Typography sx={{fontSize:18,
                        fontWeight:700}}>
                          {t.text}
                        </Typography>
                      </Grid>
                      <Grid item md={8}>
                        <Button variant="contained"
                        onClick={()=>delTask(t.id)}>Eliminar</Button>
                      </Grid>
                    </Stack>
                  )
                  )}
                </CardContent>
              </Card>
            </Grid>
        </Grid>
      </>
    );
};

export default Todo