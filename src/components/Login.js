import React from "react";
import {
  Paper,
  withStyles,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Snackbar
} from "@material-ui/core";
import { Person, Fingerprint } from "@material-ui/icons";
import { loginUser } from "../actions/authActions";
import { connect } from "react-redux";
import MySnackbarContent from "./Snackbar";
const styles = theme => ({
  margin: {
    margin: "10%"
  },
  padding: {
    padding: theme.spacing.unit
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      open:false
    };
  }
  componentDidMount() {
    console.log("d");
    if (this.props.auth) {
      this.props.history.push("/");
    }
  }
componentWillReceiveProps(next,pre){
  if(next.errors)
  if(this.props.errors) this.setState({open:true})

}
  componentDidUpdate(next,pre) {
    if(next!== pre){
    if (this.props.auth) this.props.history.push("/");
    }
  }

  handleClick() {
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  }
  handleClose= ()=>
  {
    this.setState({open:false})
  }
 
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.padding}>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Person />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="email"
                label="Email"
                type="email"
                error={this.state.errors.email}
                fullWidth
                autoFocus
                required
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="password"
                label="Password"
                type="password"
                error={this.state.errors.password}
                fullWidth
                required
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Grid item>
              <Typography
                style={{ textTransform: "none" }}
                variant="text"
                color="primary"
              >
                Not registered? Register here <a href="/signup"> this</a>
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: "10px" }}>
            <Button
              variant="outlined"
              color="primary"
              style={{ textTransform: "none" }}
              onClick={this.handleClick.bind(this)}
            >
              Login
            </Button>
          </Grid>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <MySnackbarContent
            onClose={this.handleClose}
            variant="error"
            message={this.props.errors?'Enter registered email and correct password'  :''}
          />
           
        </Snackbar>
        

      </Paper>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(withStyles(styles)(Login));
