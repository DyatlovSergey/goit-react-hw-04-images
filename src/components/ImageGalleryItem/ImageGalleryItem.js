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
