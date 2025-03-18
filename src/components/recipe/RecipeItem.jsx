import PropTypes from "prop-types";
import { AiOutlineArrowRight } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const RecipeItem = ({ recipe }) => {
  const { image, name, category, area, id } = recipe || {};
  return (
    <div className="recipe-list-item group">
      <div className="recipe-item-top">
        <LazyLoadImage
          src={image}
          className="recipe-item-img group-hover:scale-125"
          alt={name}
        />
      </div>
      <div className="recipe-item-bottom">
        <div className="p-4">
          <h3 className="recipe-item-name">{name}</h3>
          <ul className="recipe-item-info">
            <li>
              <span>Category: &nbsp;</span>
              <span>{category || "Unknown"}</span>
            </li>
            <li>
              <span>Area: &nbsp;</span>
              <span>{area || "Unknown"}</span>
            </li>
          </ul>
        </div>
        <Link to={`/recipes/${id}`} className="read-btn">
          Read Full Recipe <AiOutlineArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default RecipeItem;

RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string,
    area: PropTypes.string,
    id: PropTypes.string.isRequired,
  }),
};
