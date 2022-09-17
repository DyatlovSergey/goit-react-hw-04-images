import { Component } from "react/cjs/react.production.min";
import { createPortal } from "react-dom";
import { useEffect, useCallback } from "react";
import propTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ children, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  children: propTypes.node,
  onClose: propTypes.func,
};

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown);
//   }

//   handleKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onClose();
//     }
//   };
//   handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className="Overlay" onClick={this.handleOverlayClick}>
//         <div className="Modal">{this.props.children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
// export default Modal;
