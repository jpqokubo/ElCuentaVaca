import React, { useState } from 'react';
import Camera from '../camera/Camera';
import { Fab, Icon, Button } from '@material-ui/core';
import CameraEnhance from '@material-ui/icons/CameraEnhance';
import Batches from '../pictureBatches/Batches';
import MediaUploader from '../camera/MediaUploader';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

function Landing(props) {
  const [cameraOn, setCameraOn] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const { classes } = props;
  const cameraOpen = () => {
    setCameraOn(!cameraOn);
  };
  return (
    <React.Fragment>
      <Button
        onClick={() => setOpenLoader(!openLoader)}
        variant='contained'
        color='default'
        className={classes.button}
      >
        Upload
        <CloudUploadIcon className={classes.rightIcon} />
      </Button>
      {openLoader ? (
        <MediaUploader openLoader={openLoader} setOpenLoader={setOpenLoader} />
      ) : null}
      <Batches {...props} />
      <div style={{ position: 'fixed', bottom: 10, right: 10 }}>
        <Fab onClick={() => cameraOpen()}>
          <CameraEnhance />
        </Fab>
        {cameraOn ? (
          <Camera cameraOn={cameraOn} cameraOpen={cameraOpen} />
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(Landing);
