import Carousel from "react-bootstrap/Carousel";
import React from "react";
class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
      posts: []
    };
  }

componentDidMount(){
  this.setState({posts:this.props.posts})
}
componentDidUpdate(next,pre){
  if(next.posts!== pre.posts)
  this.setState({posts:this.props.posts})
}
  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    const { index, direction, posts } = this.state;

    if (posts.length > 0) {
      return (
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
          <Carousel.Item>
            <a href={`/post/${posts[0]._id}`}>
              <img
                className="d-block w-100"
                src={posts[0].img}
                alt="Second slide"
              />

              <Carousel.Caption>
                <div>
                  <h1>{posts[0].title}</h1>
                  <p className="mt">{posts[0].text.substring(0,500)}...</p>

                </div>
              </Carousel.Caption>
            </a>
          </Carousel.Item>
          <Carousel.Item>
            <a href={`/post/${posts[1]._id}`}>
              <img
                className="d-block w-100"
                src={posts[1].img}
                alt="Third slide"
              />

              <Carousel.Caption>
                <div>
                  <h1 className="mt">{posts[1].title}</h1>
                  <p className="mt">{posts[1].text.substring(0,500)}...</p>
                </div>
              </Carousel.Caption>
            </a>
          </Carousel.Item>
          <Carousel.Item>
            <a href={`/post/${posts[2]._id}`}>
              <img
                className="d-block w-100"
                src={posts[2].img}
                alt="First slide"
              />

              <Carousel.Caption>
                <div>
                  <h1>{posts[2].title}</h1>
                  <p className="mt">{posts[2].text.substring(0,500)}...</p>

                </div>
              </Carousel.Caption>
            </a>
          </Carousel.Item>
        </Carousel>
      );
    } else {
      return <div>dd</div>;
    }
  }
}

export default ControlledCarousel;
