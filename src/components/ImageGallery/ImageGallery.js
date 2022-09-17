import { Component } from "react/cjs/react.production.min";

class ImageGallery extends Component {
  render() {
    return <ul className="ImageGallery">{this.props.children}</ul>;
  }
}

export default ImageGallery;
