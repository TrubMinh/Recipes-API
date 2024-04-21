import { useDispatch, useSelector } from "react-redux";
import {
  getRecipesError,
  getRecipesStatus,
  getSearchQuery,
  selectSearchResult,
  getRecipesNextPage,
  clearSearch,
} from "../../redux/store/recipesSlice";
import { useEffect } from "react";
import { scrollToTop } from "../../utils/scrollToTop";
import { fetchSearchRecipe } from "../../redux/utils/recipeUtils";
import { no_results } from "../../utils/images";
import { AiOutlineClose } from "react-icons/ai";
import { STATUS } from "../../utils/status";
import { Loader } from "../../components/common";
import { RecipeList } from "../../components/recipe";

const RecipeSearchPage = () => {
  const dispatch = useDispatch();
  const queryText = useSelector(getSearchQuery);
  const searchRecipes = useSelector(selectSearchResult);
  const searchStatus = useSelector(getRecipesStatus);
  const searchError = useSelector(getRecipesError);
  const nextPageLink = useSelector(getRecipesNextPage);

  useEffect(() => scrollToTop(), []);

  useEffect(() => {
    dispatch(fetchSearchRecipe({ queryText, nextPageLink }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryText, dispatch]);

  if (!searchRecipes || searchRecipes.length === 0) {
    return (
      <div className="container py-8 custom-min-h no-results-msg">
        <img src={no_results} alt="no results image" />
        <p>No search results found!</p>
      </div>
    );
  }

  return (
    <main className="recipe-search-page custom-min-h pt-[4px]">
      <section>
        <div className="recipes-list">
          <div className="container">
            {searchRecipes?.length > 0 && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => dispatch(clearSearch())}
              >
                <AiOutlineClose className="clear-btn-icon" /> clear Result
              </button>
            )}

            {STATUS.LOADING === searchStatus ? (
              <Loader />
            ) : STATUS.FAILED === searchStatus ? (
              searchError
            ) : (
              <RecipeList recipes={searchRecipes} />
            )}

            {nextPageLink?.length > 0 && (
              <div className="next-button">
                <button
                  className="next-page-btn"
                  type="button"
                  onClick={() =>
                    dispatch(
                      fetchSearchRecipe({
                        queryText: "",
                        nextPageLink: nextPageLink,
                      })
                    )
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

export default RecipeSearchPage;
