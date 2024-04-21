export const extractIdAfterHash = (uri) => {
  let posOfHas = uri.indexOf("#");
  let extractedId = uri.slice(posOfHas + 1);
  return extractedId;
};

export const extractRecipeData = (data) => {
  let tempRecipes = data.hits.map((tempRecipe) => {
    return {
      id: extractIdAfterHash(tempRecipe.recipe.uri), // Example: recipe_8d3e4b9299664a1ca8e6f5bdb8532300,
      name: tempRecipe.recipe.label,
      image: tempRecipe.recipe.image,
      images: tempRecipe.recipe.images,
      source: tempRecipe.recipe.source,
      source_url: tempRecipe.recipe.url,
      healthLabels: tempRecipe.recipe.healthLabels,
      ingredientLines: tempRecipe.recipe.ingredientLines,
      ingredients: tempRecipe.recipe.ingredients,
      calories: tempRecipe.recipe.calories,
      totalWeight: tempRecipe.recipe.totalWeight,
      totalTime: tempRecipe.recipe.totalTime,
      cuisineType: tempRecipe.recipe.cuisineType,
      mealType: tempRecipe.recipe.mealType,
      dishType: tempRecipe.recipe.dishType,
      nutrients: tempRecipe.recipe.totalNutrients,
    };
  });

  return {
    data: tempRecipes,
    nextPage: data?._links?.next?.href,
  };
};

export const extractSingleRecipeData = (data) => {
  let tempRecipe = {
    id: extractIdAfterHash(data.recipe.uri), // Example: recipe_8d3e4b9299664a1ca8e6f5bdb8532300,
    name: data.recipe.label,
    image: data.recipe.image,
    images: data.recipe.images,
    source: data.recipe.source,
    source_url: data.recipe.url,
    healthLabels: data.recipe.healthLabels,
    ingredientLines: data.recipe.ingredientLines,
    ingredients: data.recipe.ingredients,
    calories: data.recipe.calories,
    totalWeight: data.recipe.totalWeight,
    totalTime: data.recipe.totalTime,
    cuisineType: data.recipe.cuisineType,
    mealType: data.recipe.mealType,
    dishType: data.recipe.dishType,
    nutrients: data.recipe.totalNutrients,
  };

  return tempRecipe;
};
