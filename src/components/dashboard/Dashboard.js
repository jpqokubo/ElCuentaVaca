import React, { useEffect } from "react";
import cattle from "../../images/cattle5.jpg";
import { connect } from "react-redux";
import { getPredictions } from "../../redux/actions/predictionActions";
import DisplayResults from "../displayResults/DisplayResults";

function dashboard(props) {
  useEffect(() => {
    const image = document.createElement("img");
    image.src = cattle;
    props.getPredictions(image);
  }, []);

  const predictionsResult = props.predictions.predictionsResult;
  console.log(props.predictions);
  return (
    <div>
      {predictionsResult ? (
        <DisplayResults predictionsResult={predictionsResult} />
      ) : null}
    </div>
  );
}

const mapStateToProps = state => ({
  predictions: state.predictions,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getPredictions }
)(dashboard);
