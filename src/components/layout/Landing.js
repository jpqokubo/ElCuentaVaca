import React, { useState } from 'react';
import Camera from '../camera/Camera';
import { Fab, Icon } from '@material-ui/core';
import CameraEnhance from '@material-ui/icons/CameraEnhance';
import Batches from '../pictureBatches/Batches';

function Landing(props) {
  const [cameraOn, setCameraOn] = useState(false);

  const cameraOpen = () => {
    setCameraOn(!cameraOn);
  };
  return (
    <React.Fragment>
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

export default Landing;
