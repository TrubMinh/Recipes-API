import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Loader, PageTitle, Select } from "../../components/common";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypesRecipesError,
  getTypesRecipesStatus,
  selectTypesAllRecipes,
} from "../../redux/store/typesSlice";
import { fetchTypesRecipes } from "../../redux/utils/typeUtils";
import { scrollToTop } from "../../utils/scrollToTop";
import { STATUS } from "../../utils/status";
import { RecipeList } from "../../components/recipe";

const RecipeListPage = () => {
  const { typeOf, typeName } = useParams();
  const navigate = useNavigate();
  console.log('URL params:', { typeOf, typeName });

  const [typeData, setTypeData] = useState({ typeOf, typeName });
  const dispatch = useDispatch();
  const recipes = useSelector(selectTypesAllRecipes);
  const recipesStatus = useSelector(getTypesRecipesStatus);
  const recipesError = useSelector(getTypesRecipesError);

  useEffect(() => {
    console.log('Effect triggered with typeData:', typeData);
    if (typeOf && typeName) {
      // Convert types for TheMealDB API
      let apiType = typeOf;
      let apiName = typeName;

      // Handle special cases for TheMealDB API
      if (typeOf === 'cuisine') {
        apiType = 'area';
      } else if (typeOf === 'dish' || typeOf === 'meal') {
        apiType = 'category';
      }

      console.log('Making API call with:', { apiType, apiName });
      dispatch(fetchTypesRecipes({ 
        typeData: { 
          typeOf: apiType, 
          typeName: apiName 
        } 
      }));
    }
  }, [typeData, dispatch, typeOf, typeName]);

  const handleSelection = (event) => {
    const newTypeName = event.target.value;
    console.log('Selection changed to:', newTypeName);
    // Update the URL first
    navigate(`/recipes/${typeOf}/${newTypeName}`);
    // Then update the state
    setTypeData((prevData) => ({
      ...prevData,
      typeName: newTypeName,
    }));
  };

  useEffect(() => scrollToTop(), []);

  if (!typeOf || !typeName) {
    return (
      <div className="container py-8 custom-min-h no-results-msg">
        <p>Invalid filter type or name!</p>
      </div>
    );
  }

  console.log('Current state:', {
    recipes,
    recipesStatus,
    recipesError,
    typeData
  });

  return (
    <main className="recipe-list-page custom-min-h pt-[4px]">
      <section>
        <PageTitle titleData={typeData} />
        <div className="container">
          <div className="breadcrumb-select-wrapper">
            <Breadcrumb breadcrumbData={typeData} />
            <Select typeData={typeData} handleSelection={handleSelection} />
          </div>
        </div>

        <div className="recipes-list">
          <div className="container">
            {STATUS.LOADING === recipesStatus ? (
              <Loader />
            ) : STATUS.FAILED === recipesStatus ? (
              <div className="error-message">{recipesError}</div>
            ) : recipes?.length === 0 ? (
              <div className="no-results-message">
                No recipes found for {typeName} {typeOf}
              </div>
            ) : (
              <RecipeList recipes={recipes} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecipeListPage;
