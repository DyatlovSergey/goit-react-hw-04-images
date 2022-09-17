// import { Component } from "react";

// export default class ImageGalleryItem extends Component {
//   state = {
//     arrayOfImages: null,
//   };
//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.arrayOfImages;
//     const nextName = this.props.arrayOfImages;

//     if (prevName !== nextName) {
//       console.log("prevProps.arrayOfImages:", prevProps.arrayOfImages);
//       console.log("this.props.arrayOfImages:", this.props.arrayOfImages);
//       console.log("change name of seacrh");
//       fetch(
//         "https://pixabay.com/api/?q=cat&page=1&key=24827423-94023a6c518e3be22ea88dc29&image_type=photo&orientation=horizontal&per_page=12"
//       )
//         .then((res) => res.json())
//         .then(console.log)
//         .then((arrayOfImages) => this.setState({ arrayOfImages }));
//     }
//   }
//   render() {

//     return (
//       <div>
//         <h1>GALLERY</h1>

//         {this.state.arrayOfImages && (
//           <div>
//             <p>{this.state.arrayOfImages.total} </p>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

import propTypes from "prop-types";

const ImageGalleryItem = ({ images, onGetImage }) => (
  <>
    {images.map((image) => (
      <li
        className="ImageGalleryItem"
        key={image.id}
        onClick={() => onGetImage(image.largeImageURL, image.tags)}
      >
        <img
          src={image.webformatURL}
          alt={image.tags}
          className="ImageGalleryItem-image"
        />
      </li>
    ))}
  </>
);

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: propTypes.array,
  onGetImage: propTypes.func,
};
