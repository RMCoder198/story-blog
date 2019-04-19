import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AppBar,Toolbar,Typography,Button,Avatar } from "@material-ui/core";

import { logoutUser } from "../actions/authActions";
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};
class Header extends Component {
  render() {
    const { classes } = this.props;
    const auth = (
      <div>
        <Button color="inherit">
          <a href="/post/manage">Manage Stories</a>
        </Button>

        <Button color="inherit">
          <a href="/post/create">Write Story</a>
        </Button>

        <Button color="inherit" onClick={() => this.props.logoutUser()}>
          Log Out
        </Button>
      </div>
    );
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            {this.props.auth ? (
              <Avatar aria-label="Recipe" style={{ marginRight: "10px" }}>
                <img
                  src={this.props.user.avatar}
                  width="100%"
                  height="auto"
                  alt=""
                />
              </Avatar>
            ) : (
              ""
            )}

            <Typography variant="h6" color="inherit" className={classes.grow}>
              <a href="/">Stories</a>
            </Typography>

            {this.props.auth ? (
              auth
            ) : (
              <Button color="inherit" href="/login">
                Login/Signup
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  auth: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    auth: state.auth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(withStyles(styles)(Header));
