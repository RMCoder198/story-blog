import React from "react";
import { getPost } from "../actions/postActions";
import { connect } from "react-redux";
import { Typography, Avatar } from "@material-ui/core";
class Post extends React.Component {
  componentWillMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const d = new Date();
    const { avatar, text, title, author, date, img } = this.props.post;
    return (
      <div style={{ margin: "10%" }}>
        <div>
          <Avatar aria-label="Recipe">
            <img src={avatar} width="100%" height="auto" alt="" />d
          </Avatar>
          <Typography>
            {" "}
            {author}
            <br /> {d.toString(date).substring(0, 16)}
          </Typography>
        </div>
        <div>
          <img src={img} alt="" width="100%" height="auto" />
        </div>

        <Typography paragraph="true" variant="h1" style={{marginTop:'50px',marginBottom:'50px'}}>
          {title}
        </Typography>

        <Typography  variant="display1">
          {text}
        </Typography>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { post: state.post.post, loading: state.post.loading };
};

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
