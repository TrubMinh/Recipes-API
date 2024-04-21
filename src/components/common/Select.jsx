import { cuisinesData, dishTypeData, mealTypeData } from "../../data";
import PropTypes from "prop-types";

const Select = ({ typeData, handleSelection }) => {
  let typeOfList = null;

  if (typeData.typeOf === "cuisine") {
    typeOfList = cuisinesData;
  } else if (typeData.typeOf === "dish") {
    typeOfList = dishTypeData;
  } else if (typeData.typeOf === "meal") {
    typeOfList = mealTypeData;
  }
  
  return (
    <div className="select">
      <select defaultValue={typeData?.typeName} onChange={handleSelection}>
        {typeOfList.map((typeItem) => (
          <option key={typeItem.type} value={typeItem.type}>
            {typeItem.type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

Select.propTypes = {
  typeData: PropTypes.shape({
    typeOf: PropTypes.string.isRequired,
    typeName: PropTypes.string.isRequired,
  }),
  handleSelection: PropTypes.func.isRequired,
};
