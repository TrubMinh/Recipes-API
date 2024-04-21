import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TypeList = ({ typeList, typeId }) => {
  return (
    <div className="types-list">
      {typeList.map((typeItem, idx) => (
        <Link
          to={`/recipes/${typeId}/${typeItem.type}`}
          className="types-item group"
          key={idx}
        >
          <img src={typeItem.image} alt={typeItem.type} />
          <span className="types-item-name group-hover:opacity-100">
            {typeItem.type}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default TypeList;

TypeList.propTypes = {
  typeList: PropTypes.array,
  typeId: PropTypes.string,
};
