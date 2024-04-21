import { useParams } from "react-router-dom";
import { Breadcrumb, Loader, PageTitle, Select } from "../../components/common";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypesRecipeNextPage,
  getTypesRecipesError,
  getTypesRecipesStatus,
  selectTypesAllRecipes,
} from "../../redux/store/typesSlice";
import { fetchTypesRecipes } from "../../redux/utils/typeUtils";
import { scrollToTop } from "../../utils/scrollToTop";
import { STATUS } from "../../utils/status";
import { RecipeList } from "../../components/recipe";

const RecipeListPage = () => {
  const tempData = useParams();
  const [typeData, setTypeData] = useState(tempData);
  const dispatch = useDispatch();
  const recipes = useSelector(selectTypesAllRecipes);
  const recipesStatus = useSelector(getTypesRecipesStatus);
  const recipesError = useSelector(getTypesRecipesError);
  const nextPageLink = useSelector(getTypesRecipeNextPage);

  useEffect(() => {
    dispatch(fetchTypesRecipes({ typeData, nextPageLink }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeData, dispatch]);

  const handleSelection = (event) => {
    setTypeData((prevData) => {
      return {
        ...prevData,
        typeName: event.target.value,
      };
    });
  };

  useEffect(() => scrollToTop(), []);

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
              recipesError
            ) : (
              <RecipeList typeData={typeData} recipes={recipes} />
            )}

            {nextPageLink?.length > 0 && (
              <div className="next-button">
                <button
                  className="next-page-btn"
                  type="button"
                  onClick={() =>
                    dispatch(fetchTypesRecipes({ typeData: {}, nextPageLink }))
                  }
                >
                  Next Page
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default RecipeListPage;
