import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { scrollToTop } from "../../utils/scrollToTop";
import { BsArrowLeft } from "react-icons/bs";
import { fetchSingleRecipe } from "../../redux/utils/recipeUtils";
import { selectSingleRecipe } from "../../redux/store/recipesSlice";
import { Loader } from "../../components/common";
import {
  AiOutlineCheckSquare,
  AiOutlineUser,
  AiOutlineYoutube,
} from "react-icons/ai";
import { BiDish, BiWorld } from "react-icons/bi";

const RecipeSinglePage = () => {
  const { id: recipeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipe = useSelector(selectSingleRecipe);

  useEffect(() => scrollToTop(), []);

  useEffect(() => {
    dispatch(fetchSingleRecipe(recipeId));
  }, [recipeId, dispatch]);

  if (!recipe) {
    return <Loader />;
  }

  return (
    <main className="recipe-single-page custom-min-h pt-[4px]">
      <section className="recipe-single">
        <div className="container recipe-single-top">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="back-btn flex items-center font-semibold mb-4"
          >
            <BsArrowLeft className="me-2" /> Go Back
          </button>

          <h3 className="recipe-single-name">{recipe.name}</h3>
          {/* details section one */}
          <div className="recipe-group-one">
            <div className="recipe-left">
              <div className="recipe-left-img-wrapper">
                <img src={recipe.image} alt={recipe.name} />
              </div>
            </div>

            <div className="recipe-right">
              <h4 className="recipe-right-name">{recipe.name}</h4>
              <div className="flex gap-2 mb-4">
                <span className="badge-orange">{recipe.area}</span>
                <span className="badge-orange">{recipe.category}</span>
              </div>
              
              <div className="recipe-block general-info">
                <div className="block-list">
                  <div className="list-elem">
                    <div className="list-elem-left">
                      <BiWorld className="me-2" />
                      <span>Area</span>
                    </div>
                    <span className="list-elem-value">{recipe.area}</span>
                  </div>
                  <div className="list-elem">
                    <div className="list-elem-left">
                      <BiDish className="me-2" />
                      <span>Category</span>
                    </div>
                    <span className="list-elem-value">{recipe.category}</span>
                  </div>
                  {recipe.source && (
                    <div className="list-elem">
                      <div className="list-elem-left">
                        <AiOutlineUser className="me-2" />
                        <span>Source</span>
                      </div>
                      <a 
                        href={recipe.source} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="list-elem-value text-blue-600 hover:underline"
                      >
                        View Source
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {recipe.tags && recipe.tags.length > 0 && (
                <div className="recipe-block health-labels">
                  <p className="block-title">Tags:</p>
                  <ul className="block-list flex flex-wrap gap-2">
                    {recipe.tags.map((tag, idx) => (
                      <li key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {tag.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* end of details section one */}
        </div>

        <div className="container recipe-single-bottom">
          <div className="recipe-block ingredients">
            <p className="block-title text-lg">Ingredients:</p>
            <ul className="block-list">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx} className="block-list-item">
                  <AiOutlineCheckSquare className="text-jet" size={22} />
                  <div>
                    <p className="font-semibold">{ingredient}</p>
                    <div className="badges-group">
                      <span>Measure:</span> {recipe.measures[idx]}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe-block instructions">
            <p className="block-title text-lg">Instructions:</p>
            <div className="block-list">
              <p className="whitespace-pre-line">{recipe.instructions}</p>
            </div>
          </div>

          {recipe.youtube && (
            <div className="recipe-block youtube">
              <p className="block-title text-lg flex items-center gap-2">
                <AiOutlineYoutube className="text-red-600" size={24} />
                Watch on YouTube:
              </p>
              <div className="block-list">
                <a
                  href={recipe.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-2"
                >
                  <AiOutlineYoutube size={20} />
                  Watch Video
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default RecipeSinglePage;
