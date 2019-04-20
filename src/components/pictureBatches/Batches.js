import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import {
  deleteBatchPictures,
  processBatchPictures
} from '../../redux/actions/cameraActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignContent: 'center'
  },
  card: {
    width: 325,
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
function Transition(props) {
  return <Slide direction='up' {...props} />;
}

function Batches(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [batch, setBatch] = React.useState('');

  function handleClickOpen(batch) {
    setOpen(true);
    setBatch(batch);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleDelete(batch) {
    props.deleteBatchPictures(batch);
    setOpen(false);
  }
  const handleProcess = batch => {
    props.processBatchPictures(batch);
    props.history.push('/process');
  };
  return (
    <React.Fragment>
      <Grid container className={classes.root}>
        {props.pictureBatches
          ? props.pictureBatches.map((batch, index) => (
              <Grid item key={index}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label='Lote de Inventario'
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
                    title='Lote de Inventario'
                    subheader={moment(batch.inventoryDate).format('MM/DD/YY')}
                  />

                  <CardMedia
                    className={classes.media}
                    image={batch.pictures[0].dataUri}
                    title='Estancia Serebo'
                  />

                  <CardContent>
                    <Typography component='p'>
                      Hay un total de <strong>{batch.pictures.length}</strong>{' '}
                      de fotos
                    </Typography>
                    <Typography component='p'>
                      Revizar fotos y somoter a procesar
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <IconButton
                      onClick={() => handleProcess(batch)}
                      aria-label='Revizar Fotos'
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleClickOpen(batch)}
                      style={{ marginLeft: '60%' }}
                    >
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle id='alert-dialog-slide-title'>
            {'Estancia Serebo'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              Por favor confirme la eliminación permanente de las imágenes.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              Cancelar
            </Button>
            <Button onClick={() => handleDelete(batch)} color='primary'>
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
}
const mapStateToProps = state => ({
  pictureBatches: state.camera.pictureBatches
});
export default connect(
  mapStateToProps,
  { deleteBatchPictures, processBatchPictures }
)(Batches);
