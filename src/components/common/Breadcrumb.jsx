import { AiFillHome } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

const Breadcrumb = ({ breadcrumbData }) => {
  return (
    <ul className="breadcrumb">
      <li>
        <Link to="/" className="flex items-center">
          <AiFillHome className="me-3" size={20} />
          Home
        </Link>
      </li>
      <li>
        <BsChevronRight />
      </li>
      <li>
        <Link
          to={`recipes/${breadcrumbData.typeOf}/${breadcrumbData.typeName}`}
        >
          {breadcrumbData.typeOf} / {breadcrumbData.typeName}
        </Link>
      </li>
    </ul>
  );
};

export default Breadcrumb;

Breadcrumb.propTypes = {
  breadcrumbData: PropTypes.object,
};
