import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Fab,
  CardActions,
  Button,
  Avatar
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import { deleteSinglePicture } from '../../redux/actions/cameraActions';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignContent: 'center'
  },
  card: {
    width: 425,
    margin: 10
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  deleteButton: {
    marginLeft: 25
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

function ProcessPictures(props) {
  const classes = useStyles();
  const batch = props.batch;
  const handleDeletePicture = id => {
    props.deleteSinglePicture(id);
  };
  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        {batch.pictures
          ? batch.pictures.map((picture, index) => (
              <Grid item key={index}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label='Foto de Inventario'
                        className={classes.avatar}
                      >
                        {index + 1}
                      </Avatar>
                    }
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title='Foto de Inventario'
                    subheader={moment(batch.inventoryDate).format('MM/DD/YY')}
                  />

                  <CardMedia
                    className={classes.media}
                    image={picture.dataUri}
                    title='Estancia Serebo'
                  />
                  <CardActions className={classes.actions}>
                    <Fab
                      onClick={() => handleDeletePicture(picture.id)}
                      aria-label='Delete'
                      className={classes.fab}
                    >
                      <Delete />
                    </Fab>
                  </CardActions>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </React.Fragment>
  );
}
const mapStateToProps = state => ({
  batch: state.camera.batch,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { deleteSinglePicture }
)(ProcessPictures);
