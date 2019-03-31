import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { registerUser } from "../../redux/actions/authActions";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import FormHelperText from "@material-ui/core/FormHelperText";
const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },

  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: "auto",
      marginRight: "auto"
    },
    submit: {
      marginTop: theme.spacing.unit * 3
    }
  }
}));

function Register(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  const handleSubmit = e => {
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      mobile_number: mobileNumber,
      email: email,
      password: password,
      password2: password2
    };
    props.registerUser(newUser, props.history);

    e.preventDefault();
  };

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/home");
    }
    if (props.errors) {
      setErrors(props.errors);
    }
  });
  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6" gutterBottom>
            Register
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                style={{ textTransform: "capitalize" }}
                label="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                name="first_name"
                fullWidth
              />
              <FormHelperText style={{ color: "red" }}>
                {errors.first_name}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                style={{ textTransform: "capitalize" }}
                label="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                name="last_name"
                fullWidth
              />
              <FormHelperText style={{ color: "red" }}>
                {errors.last_name}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                style={{ textTransform: "capitalize" }}
                label="Phone Number"
                value={mobileNumber}
                onChange={e => setMobileNumber(e.target.value)}
                name="mobile_number"
                fullWidth
              />
              <FormHelperText style={{ color: "red" }}>
                {" "}
                {errors.mobile_number}{" "}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                style={{ textTransform: "capitalize" }}
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                fullWidth
              />
              <FormHelperText style={{ color: "red" }}>
                {" "}
                {errors.email}{" "}
              </FormHelperText>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                id="adornment-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
                fullWidth
              />
              <FormHelperText style={{ color: "red" }}>
                {" "}
                {errors.password}{" "}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="adornment-password"
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                name="password2"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <FormHelperText style={{ color: "red" }}>
                {" "}
                {errors.password2}{" "}
              </FormHelperText>
            </Grid>
            <Button
              onClick={handleSubmit}
              style={{ marginTop: "2rem" }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
