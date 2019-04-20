import React from "react";
import { connect } from "react-redux";
import { Button, TextField , Snackbar,Typography} from "@material-ui/core";
import { addPost } from "../actions/postActions";
import MySnackbarContent from "./Snackbar";

class createPost extends React.Component {
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

componentDidUpdate(){
  if(!this.props.auth)  
    this.props.history.push('/login')
}
handleClose= ()=>
{
  this.setState({open:false})
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
      this.props.addPost(post,this.props.history);
    }
      else
      this.setState({open:true,error:'Text should be more than 200 characters '})
  
    }
    else
    this.setState({open:true,error:"Don't leave anything blank"})
  


  }
  render() {
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
        <Typography readonly color="secondary">Test Image link: https://images.unsplash.com/photo-1497942304796-b8bc2cc898f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80</Typography> 
          <TextField
          id="outlined-full-width"
          label="Story Text"
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
  return { user: state.auth.user, auth: state.auth.isAuthenticated };
};

export default connect(
  mapStateToProps,
  { addPost }
)(createPost);
