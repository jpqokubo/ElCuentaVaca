import React, { useState } from "react";
import Camera from "../camera/Camera";
import { Fab, Icon } from "@material-ui/core";
import CameraEnhance from "@material-ui/icons/CameraEnhance";

function Landing() {
  const [cameraOn, setCameraOn] = useState(false);

  const cameraOpen = () => {
    setCameraOn(!cameraOn);
  };
  return (
    <div style={{ position: "fixed", bottom: 10, right: 10 }}>
      <Fab onClick={() => cameraOpen()}>
        <CameraEnhance />
      </Fab>
      {cameraOn ? <Camera cameraOn={cameraOn} cameraOpen={cameraOpen} /> : null}
    </div>
  );
}

export default Landing;
