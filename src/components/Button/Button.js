import propTypes from "prop-types";

const Button = ({ onHandleClickLoadMore }) => (
  <div className="button-box">
    <button
      type="button"
      className="button"
      onClick={() => onHandleClickLoadMore()}
    >
      Load more
    </button>
  </div>
);

export default Button;

Button.propTypes = {
  onHandleClickLoadMore: propTypes.func,
};
