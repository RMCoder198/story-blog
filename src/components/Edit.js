import React from "react";
import { getPost,updatePost } from "../actions/postActions";
import { connect } from "react-redux";
import { Button, TextField, Snackbar } from "@material-ui/core";
import MySnackbarContent from "./Snackbar";

class editPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      img: "",
      open:false,
      error:''
    };
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  
  componentDidUpdate(pre) {
    if (this.props.post !== pre.post)
      this.setState({
        title: this.props.post.title,
        text: this.props.post.text,
        img: this.props.post.img
      });
    if (!this.props.auth) this.props.history.push("/login");
  if(this.props.errors) this.setState({open:true,error:'some error has occured plese retry'})
  }
  handleClick() {
    const post = {
      title: this.state.title,
      text: this.state.text,
      img: this.state.img,
      author: this.props.user.name,
      authorId: this.props.user.id,
      avatar: this.props.user.avatar
    };
if(post.title.length>0 && post.img.length>0){
  
    if(post.text.length>200){
    this.props.updatePost(post, this.props.match.params.id);
    this.props.getPost(this.props.match.params.id); 
    }
    else
    this.setState({open:true,error:'Text should be more than 200 characters '})

  }
  else
  this.setState({open:true,error:"Don't leave anything blank"})

  }
  handleClose= ()=>
  {
    this.setState({open:false})
  }
  render() {
    //   console.log(this.props.post)
    return (
      <div style={{ margin: "10%" }}>
        <TextField
          id="outlined-full-width"
          label="Title"
          style={{ margin: 8 }}
          placeholder="title"
          fullWidth
          multiline
          margin="normal"
          variant="outlined"
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <TextField
          id="outlined-full-width"
          label="Image link"
          style={{ margin: 8 }}
          placeholder="www..."
          fullWidth
          multiline
          margin="normal"
          variant="outlined"
          value={this.state.img}
          onChange={e => this.setState({ img: e.target.value })}
        />
        <TextField
          id="outlined-full-width"
          label="Post Text"
          style={{ margin: 8 }}
          placeholder="lorem ipsum"
          fullWidth
          multiline
          margin="normal"
          variant="outlined"
          value={this.state.text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        <Button color="primary" onClick={this.handleClick.bind(this)}>
          Submit
        </Button>
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
            message={this.state.error}
          />
           
        </Snackbar>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    auth: state.auth.isAuthenticated,
    post: state.post.post
  };
};

export default connect(
  mapStateToProps,
  { updatePost, getPost }
)(editPost);
