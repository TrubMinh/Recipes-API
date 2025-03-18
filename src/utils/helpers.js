export const extractIdAfterHash = (uri) => {
  let posOfHas = uri.indexOf("#");
  let extractedId = uri.slice(posOfHas + 1);
  return extractedId;
};

export const extractRecipeData = (data) => {
  if (!data.meals) return { data: [], nextPage: null };

  let tempRecipes = data.meals.map((meal) => {
    // Check if this is a filtered result (has idMeal) or a search result (has full meal data)
    if (meal.idMeal) {
      // This is a filtered result, we need to fetch the full recipe data
      return {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory || "Unknown",
        area: meal.strArea || "Unknown",
        instructions: meal.strInstructions || "",
        ingredients: [],
        measures: [],
        source: meal.strSource || "",
        tags: meal.strTags ? meal.strTags.split(',') : [],
        youtube: meal.strYoutube || "",
        dateModified: meal.dateModified || "",
      };
    } else {
      // This is a search result with full meal data
      const ingredients = [];
      const measures = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(meal[`strIngredient${i}`]);
          measures.push(meal[`strMeasure${i}`]);
        }
      }

      return {
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory || "Unknown",
        area: meal.strArea || "Unknown",
        instructions: meal.strInstructions || "",
        ingredients,
        measures,
        source: meal.strSource || "",
        tags: meal.strTags ? meal.strTags.split(',') : [],
        youtube: meal.strYoutube || "",
        dateModified: meal.dateModified || "",
      };
    }
  });

  return {
    data: tempRecipes,
    nextPage: null, // TheMealDB doesn't support pagination
  };
};

export const extractSingleRecipeData = (data) => {
  if (!data.meals || !data.meals[0]) return null;
  
  const meal = data.meals[0];
  const ingredients = [];
  const measures = [];
  
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(meal[`strIngredient${i}`]);
      measures.push(meal[`strMeasure${i}`]);
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    ingredients,
    measures,
    source: meal.strSource,
    tags: meal.strTags ? meal.strTags.split(',') : [],
    youtube: meal.strYoutube,
    dateModified: meal.dateModified,
  };
};
