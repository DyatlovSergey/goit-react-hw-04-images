// import { Component } from "react/cjs/react.production.min";
import Searchbar from "./components/Searchbar/Searchbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
import Button from "./components/Button/Button";
import Loading from "./loading";
import Modal from "./components/Modal/Modal";
import findImages from "./find";
import { useState, useEffect } from "react";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [arrayOfImages, setArrayOfImages] = useState([]);
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalTag, setModalTag] = useState(null);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    fetch();
  }, [searchValue, page]);

  const fetch = async () => {
    try {
      Loading.circle();
      let pictures = await findImages(searchValue, page);

      if (pictures.totalHits === 0) {
        setVisible(false);
        toast.info("No pictures found for your request");
        Loading.remove();
        return;
      }

      if (page === 1) {
        setArrayOfImages([...pictures.hits]);
      }

      if (arrayOfImages.length === pictures.totalHits) {
        setVisible(false);
      }

      if (page > 1) {
        setArrayOfImages((prev) => [...prev, ...pictures.hits]);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
    Loading.remove();
  };

  const getImageforModal = (image, tag) => {
    toggleModal();
    setModalImage(image);
    setModalTag(tag);
  };

  const handleClickLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleFormSubmit = (value) => {
    setSearchValue(value);
    setPage(1);
    setArrayOfImages([]);
    setVisible(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ToastContainer />
      <Searchbar formSubmit={handleFormSubmit} />
      <ImageGallery>
        <ImageGalleryItem
          images={arrayOfImages}
          onGetImage={getImageforModal}
        />
      </ImageGallery>
      {visible && <Button onHandleClickLoadMore={handleClickLoadMore} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalImage} alt={modalTag} />
        </Modal>
      )}
    </>
  );
};

export default App;

// class App extends Component {
//   state = {
//     searchValue: "",
//     arrayOfImages: [],
//     page: 1,
//     visible: false,
//     showModal: false,
//     modalImage: null,
//     modalTag: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.searchValue !== this.state.searchValue) {
//       this.setState({ page: 1, arrayOfImages: [], visible: true });
//       this.fetch();
//     }

//     if (
//       prevState.searchValue === this.state.searchValue &&
//       prevState.page !== this.state.page
//     ) {
//       this.fetch();
//     }
//   }

//   async fetch() {
//     const { searchValue, page, arrayOfImages } = this.state;
//     try {
//       Loading.circle();
//       let pictures = await findImages(searchValue, page);

//       if (pictures.totalHits === 0) {
//         this.setState({ visible: false });
//         toast.info("No pictures found for your request");
//         Loading.remove();
//         return;
//       }
//       if (page === 1) {
//         this.setState({
//           arrayOfImages: [...pictures.hits],
//         });
//       }

//       if (arrayOfImages.length === pictures.totalHits) {
//         this.setState({ visible: false });
//       }

//       if (page > 1) {
//         this.setState((prevState) => ({
//           arrayOfImages: [...prevState.arrayOfImages, ...pictures.hits],
//         }));

//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: "smooth",
//         });
//       }
//     } catch (error) {
//       toast.error("Something wrong");
//       Loading.remove();
//       return Promise.reject(error);
//     }
//     Loading.remove();
//   }

//   handleClickLoadMore = () => {
//     this.setState((prevState) => ({ page: prevState.page + 1 }));
//   };

//   handleFormSubmit = (value) => {
//     this.setState({ searchValue: value });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };
//   getImageforModal = (image, tag) => {
//     this.toggleModal();
//     this.setState({ modalImage: image, modalTag: tag });
//   };

//   render() {
//     const { arrayOfImages, visible, showModal, modalImage, modalTag } =
//       this.state;
//     return (
//       <>
//         <ToastContainer />
//         <Searchbar formSubmit={this.handleFormSubmit} />
//         <ImageGallery>
//           <ImageGalleryItem
//             images={arrayOfImages}
//             onGetImage={this.getImageforModal}
//           />
//         </ImageGallery>
//         {visible && <Button onHandleClickLoadMore={this.handleClickLoadMore} />}
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={modalImage} alt={modalTag} />
//           </Modal>
//         )}
//       </>
//     );
//   }
// }

// export default App;
