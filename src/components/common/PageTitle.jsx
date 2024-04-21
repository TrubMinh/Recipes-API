import PropTypes from "prop-types";
import { food_bg_one } from "../../utils/images";
import { SiCodechef } from "react-icons/si";

const PageTitle = ({ titleData }) => {
  return (
    <div
      className="page-title"
      style={{
        background: `url('${food_bg_one}') center/cover no-repeat`,
      }}
    >
      <div className="container">
        <h2>
          <span>{titleData.typeOf}</span>
          <span className="px-4">/</span>
          <span>{titleData.typeName}</span>
          <span className="page-title-icon">
            <SiCodechef />
          </span>
        </h2>
      </div>
    </div>
  );
};

export default PageTitle;

PageTitle.propTypes = {
  titleData: PropTypes.object,
};
