import React from "react";
import ReactCamera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

function Camera() {
  const onTakePhoto = dataUri => {
    // Do stuff with the dataUri photo...
    console.log("takePhoto");
  };
  return (
    <div>
      <ReactCamera
        onTakePhoto={dataUri => {
          onTakePhoto(dataUri);
        }}
      />
    </div>
  );
}
export default Camera;
