import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import { getPosts } from "../actions/postActions";
import ControlledCarousel from "./Carousel";
import Card from "@material-ui/core/Card";
import {
  Avatar,
  CardActionArea,
  CardContent,
  Typography,
  CardHeader
} from "@material-ui/core";
class Feed extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    } else {
      const carouselArticles = this.props.posts;
      const posts = this.props.posts.map(post => (
        <div>
          <Card
            style={{
              height: "350px",
              color: "white",
              width: "80%",
              marginBottom: "50px",
              backgroundImage: `url("${post.img}")`,
              backgroundSize: "100% auto"
            }}
            
          >
            <CardHeader
            
              color="primary"
              avatar={
                <Avatar aria-label="Recipe">
                  <img src={post.avatar} width="100%" height="auto" alt="" />
                </Avatar>
              }
            />
            <CardActionArea color="inherit">
              <center> 
              <CardContent
                color="inherit"
                onClick={() => this.props.history.push(`/post/${post._id}`)}
              >
                <Typography
                  gutterBottom
                  variant="title"
                  component="h1"
                  color="inherit"
                >
                  <center>{post.title}</center>
                </Typography>
                <Typography
                  gutterBottom
                  
                  component="display4"
                  color="inherit"
                >
                  {post.text.substring(0,200)}...
                </Typography>
                
                <a>
                  <Typography color="inherit">
                    Learn More
                  </Typography>
                </a>
              </CardContent>
              </center>
            </CardActionArea>
          </Card>
        </div>
      ));

      return (
        <div>
          <ControlledCarousel posts={carouselArticles} />
          <div>
            <div>
              <div>
                <center>{posts}</center>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    loading: state.post.loading,
    posts: state.post.posts
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Feed);
