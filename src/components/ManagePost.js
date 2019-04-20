import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { getPostByUserId, deletePost } from "../actions/postActions";
import Spinner from "./Spinner";
import { Button } from "@material-ui/core";
import { Build, Delete } from "@material-ui/icons";
import { Modal, Typography } from "@material-ui/core";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    width: "80%",
    margin: "10%"
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class managePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      post_id: ""
    };
  }

  
  static getDerivedStateFromProps(next,pre){
    if (!next.auth) next.history.push("/login");
    return next
  }
  componentDidMount() {

    if (!this.props.auth) 
    {
      this.props.history.push("/login");
  
    }else{
      const id = this.props.user.id;
      this.props.getPostByUserId(id);
    }
}


  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.props.deletePost(this.state.post_id);
    this.setState({ open: false });

  };
  render() {
    const { classes } = this.props;
    console.log(this.props.posts.length);
    if (this.props.loading) return <Spinner />;
    else {
      return (
        <div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>S. No.</CustomTableCell>
                  <CustomTableCell align="right">Title</CustomTableCell>
                  <CustomTableCell align="right">Edit</CustomTableCell>
                  <CustomTableCell align="right">Delete</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.posts.map((post, index) => (
                  <TableRow className={classes.row} key={index}>
                    <CustomTableCell component="th" scope="row">
                      {index + 1}
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      {post.title.substring(0, 10)}
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      <a href={`/post/edit/${post._id}`}>
                        <Build />
                      </a>
                    </CustomTableCell>
                    <CustomTableCell align="right">
                      <Button
                        onClick={() => {
                          this.setState({ open: true, post_id: post._id });
                        }}
                      >
                        <Delete />
                      </Button>
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <Typography variant="h6" id="modal-title">
                Are you sure , you want to delete???
              </Typography>
              <Button color="primary" onClick={this.handleDelete}>
                Delete
              </Button>
            </div>
          </Modal>
        </div>
      );
    }
  }
}
managePost.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.post.loading,
    posts: state.post.posts,
    auth: state.auth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { getPostByUserId, deletePost }
)(withStyles(styles)(managePost));
