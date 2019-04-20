import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import moment from 'moment';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ReactCamera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { batchPictures } from '.././../redux/actions/cameraActions';
import { connect } from 'react-redux';
import uuid from 'uuid';

const useStyles = makeStyles({
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
});

function Transition(props) {
  return <Slide direction='up' {...props} />;
}

function Camera(props) {
  const [pictures, setPictures] = useState([]);
  const classes = useStyles();

  const onTakePhoto = dataUri => {
    // Do stuff with the dataUri photo...
    setPictures([...pictures, { dataUri, id: uuid() }]);
  };

  const onClose = () => {
    const inventoryDate = moment().format();
    const id = uuid();
    if (pictures.length > 0) {
      props.batchPictures(pictures, inventoryDate, id);
    }

    props.cameraOpen();
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={props.cameraOn}
        onClose={props.cameraOpen}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color='inherit' onClick={onClose} aria-label='Close'>
              <CloseIcon />
            </IconButton>

            <Button color='inherit' onClick={onClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <ReactCamera
          imageType='jpg'
          isFullscreen={true}
          onTakePhoto={dataUri => {
            onTakePhoto(dataUri);
          }}
        />
      </Dialog>
    </div>
  );
}
const mapStateToProps = state => ({
  pictures: state.camera.pictures,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { batchPictures }
)(Camera);
