import * as React from "react";
import {Grid,Paper} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    return (
        <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
                <Paper sx={{p: 2}}>
                    <Box>
                        <h2>Todo</h2>
                        <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md:3}}>
                            <Grid item xs={6}>
                                {OutlinedCard()}
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Todo