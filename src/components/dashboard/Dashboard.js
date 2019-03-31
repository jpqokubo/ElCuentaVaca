import React, { useEffect } from "react";
import objectDetection from "../../utils/tensorflow/tensorflow";
import cattle from "../../images/cattle6.jpg";
import { connect } from "react-redux";

function dashboard(props) {
  useEffect(() => {
    const image = document.getElementById("image");
    const result = objectDetection(image);
  });

  return (
    <div>
      <img id="image" src={cattle} alt="" />
      hello cuenta vaca
    </div>
  );
}

const mapStateToProps = state => ({
  predictions: state.predictions,
  errors: state.errors
});
export default connect(mapStateToProps)(dashboard);
