import React from 'react'
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import {Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import moment from 'moment'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignContent: "center"
  },
    card: {
      maxWidth: 400,
      margin: 10
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    deleteButton: { 
      marginLeft: 20
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

function Batches(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }
  function handleDelete (batch) { 
    console.log(batch)
  }
  return (
    <Grid container className={classes.root}>
      
      
      {props.pictureBatches ? props.pictureBatches.map((batch, index) => (
        <Grid item >
      <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {index + 1}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title="Inventario"
        subheader= {moment(batch.inventoryDate).format('MM/DD/YY')}
      />
      <CardMedia
        className={classes.media}
        image={batch.pictures[0]}
        title="Estancia Serebo"
      />
      <CardContent>
        <Typography component="p">
          Hay un total de <strong>{batch.pictures.length}</strong> de fotos
          </Typography>
          <Typography component="p">
          Revizar fotos y somoter a procesar
          </Typography>
        
      </CardContent>
      <CardActions className={classes.actions} >
        <IconButton aria-label="Revizar Fotos">
         <Edit />
        </IconButton>
        <IconButton onClick={ () => { if (window.confirm('Are you sure you wish to delete this item?')); handleDelete(batch) } } style ={{ marginLeft : '50%'}}> 
          <Delete />
          </IconButton>
      </CardActions>
    </Card>
     </Grid>
    )) : null}
</Grid>
 
  
  )
}
const mapStateToProps = state => ({
 pictureBatches : state.camera.pictureBatches
  });
export default connect(mapStateToProps) (Batches)
