import { createAsyncThunk } from "@reduxjs/toolkit";
import { APP_ID, APP_KEY } from "../../api/apiConstants";
import { extractRecipeData } from "../../utils/helpers";
import fetchData from "../../api/axios";

export const fetchTypesRecipes = createAsyncThunk(
  "recipes/type/fetchRecipes",
  async (obj) => {
    const { typeData, nextPageLink } = obj;
    let recipesData = null;

    // if the given fetch request is not a link & doesn't have type=public information
    if (!(Object.keys(typeData).length === 0)) {
      const { data } = await fetchData(
        `?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&${typeData.typeOf}Type=${typeData.typeName}`
      );
      recipesData = extractRecipeData(data);
    } else {
      // in case of the next page fetch link where we already have type information as well
      const { data } = await fetchData(`${nextPageLink}`);
      recipesData = extractRecipeData(data);
    }
    return recipesData;
  }
);
