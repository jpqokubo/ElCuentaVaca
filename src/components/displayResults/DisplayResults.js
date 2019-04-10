import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  useLayoutEffect
} from "react";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Grid
} from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import cattle from "../../images/cattle4.jpg";
import "../../index.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignContent: "center"
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  card: {
    maxWidth: 600,
    height: 625,
    margin: 20
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
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

function displayResults(props) {
  const predictionsResult = props.predictionsResult;
  const predictions = props.predictionsResult.predictions;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [showImage, setShowImage] = useState(true);
  function handleExpandClick() {
    setExpanded(!expanded);
  }

  useEffect(() => {
    drawCanvas();
  }, [predictionsResult]);
  const cropToCanvas = (image, canvas, ctx) => {
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (naturalWidth > naturalHeight) {
      ctx.drawImage(
        image,
        (naturalWidth - naturalHeight) / 2,
        0,
        naturalHeight,
        naturalHeight,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
    } else {
      ctx.drawImage(
        image,
        0,
        (naturalHeight - naturalWidth) / 2,
        naturalWidth,
        naturalWidth,
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
      );
    }
  };

  const drawCanvas = () => {
    let image = document.getElementById(predictionsResult.id);
    const c = document.getElementById(predictionsResult.id + "canvas");
    const context = c.getContext("2d");
    cropToCanvas(image, c, context);
    context.drawImage(image, 0, 0);
    context.font = "16px Arial";
    console.log("number of detections: ", predictions.length);
    for (let i = 0; i < predictions.length; i++) {
      context.beginPath();
      context.rect(...predictions[i].bbox);
      context.lineWidth = 3;
      context.strokeStyle = "green";
      context.fillStyle = "black";
      context.stroke();
      context.fillText(
        predictions[i].score.toFixed(3) + " " + predictions[i].class,
        predictions[i].bbox[0],
        predictions[i].bbox[1] > 10 ? predictions[i].bbox[1] - 5 : 10
      );
    }
    setShowImage(false);
  };

  return (
    <React.Fragment>
      {showImage ? (
        <img src={predictionsResult.image} id={predictionsResult.id} />
      ) : null}

      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Inventario" className={classes.avatar}>
              {props.index}{" "}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={`Estacia Serebo (Vacas en Foto: ${predictions.length})`}
          subheader={moment().format("MM/DD/YY")}
        />
        <CardActions>
          <canvas
            style={{ width: 600, height: 500 }}
            key={predictionsResult.id + "canvas"}
            id={predictionsResult.id + "canvas"}
          />
        </CardActions>
      </Card>
    </React.Fragment>
  );
}
export default displayResults;
