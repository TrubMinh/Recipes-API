import PropTypes from "prop-types";

const Title = ({ subTitle, mainTitle }) => {
  return (
    <div className="title">
      <h3 className="sub-title">{subTitle}</h3>
      <h2 className="main-title">{mainTitle}</h2>
    </div>
  );
};

export default Title;

Title.propTypes = {
  subTitle: PropTypes.string,
  mainTitle: PropTypes.string,
};
