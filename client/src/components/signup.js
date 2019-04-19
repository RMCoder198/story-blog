import React from "react";
import { Paper, withStyles, Grid, TextField, Button , Snackbar} from "@material-ui/core";
import { Face, Fingerprint, Person } from "@material-ui/icons";

import { registerUser } from "../actions/authActions";
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

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {},
      open:false
    };
  }
  componentDidMount() {
    if (this.props.auth) this.props.history.push("/");
  }
  handleClose= ()=>
  {
    this.setState({open:false})
  }
  componentDidUpdate() {
    if (this.props.auth) this.props.history.push("/");
  }
  componentWillReceiveProps(next,pre){
    if(next.errors)
    if(this.props.errors) this.setState({open:true})
  console.log(next.errors)
  }
  handleClick() {
    const user = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(user, this.props.history);
  }
 
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.padding}>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="username"
                label="Username"
                type="email"
                fullWidth
                autoFocus
                required
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Person />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="email"
                label="Email"
                type="email"
                fullWidth
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
                fullWidth
                required
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </Grid>
          </Grid>

          <Grid container justify="center" style={{ marginTop: "10px" }}>
            <Button
              variant="outlined"
              color="primary"
              style={{ textTransform: "none" }}
              onClick={this.handleClick.bind(this)}
            >
              SignUp
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
            message={this.props.errors?'Enter valid email and password with more than 5 characters'  :''}
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
  { registerUser }
)(withStyles(styles)(Signup));
