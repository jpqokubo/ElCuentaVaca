import React, { useEffect } from "react";
import cattle from "../../images/cattle10.JPG";
import { connect } from "react-redux";
import { getPredictions } from "../../redux/actions/predictionActions";
import DisplayResults from "../displayResults/DisplayResults";
import { Grid, Paper, Typography, CircularProgress } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignContent: "center"
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "90%",
    margin: 10
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  card: {
    maxWidth: 600,
    height: 600
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  progress: {
    margin: "25%"
  }
}));

function dashboard(props) {
  const predictionsResult = props.predictions.predictionsResult;
  const classes = useStyles();
  useEffect(() => {
    const image = document.createElement("img");
    image.src = cattle;
    props.getPredictions(image);
  }, []);

  const calculateInvetory = () => {
    let totalCows = 0;
    predictionsResult.map(
      predictions => (totalCows = predictions.predictions.length + totalCows)
    );
    return (
      <div>
        <Typography inline variant="h5" style={{ textAlign: "center" }}>
          Inventario total de vacas:
        </Typography>{" "}
        <Typography
          inline
          primary
          variant="h5"
          style={{ textAlign: "center", color: "#4286f4" }}
        >
          {totalCows}
        </Typography>{" "}
      </div>
    );
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid
          container
          className={classes.demo}
          justify="center"
          alignItems="center"
          direction="row"
          spacing={16}
        >
          {props.loading ? null : (
            <Paper className={classes.paper}>{calculateInvetory()}</Paper>
          )}

          {props.loading ? (
            <CircularProgress className={classes.progress} />
          ) : (
            predictionsResult.map((predictions, index) => (
              <DisplayResults
                predictionsResult={predictions}
                index={index + 1}
              />
            ))
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  predictions: state.predictions,
  errors: state.errors,
  loading: state.predictions.loading
});
export default connect(
  mapStateToProps,
  { getPredictions }
)(dashboard);
