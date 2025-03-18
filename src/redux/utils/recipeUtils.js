import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../api/apiConstants";
import fetchData from "../../api/axios";
import {
  extractRecipeData,
  extractSingleRecipeData,
} from "../../utils/helpers";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (queryText = "chicken") => {
    try {
      const { data } = await fetchData(ENDPOINTS.SEARCH, { s: queryText });
      let recipesData = extractRecipeData(data);
      return recipesData;
    } catch (error) {
      throw Error("Failed to fetch recipes.");
    }
  }
);

export const fetchSearchRecipe = createAsyncThunk(
  "recipes/fetchSearchRecipes",
  async ({ queryText }) => {
    try {
      const { data } = await fetchData(ENDPOINTS.SEARCH, { s: queryText });
      let recipesData = extractRecipeData(data);
      return recipesData;
    } catch (error) {
      throw Error("Failed to search recipes.");
    }
  }
);

export const fetchSingleRecipe = createAsyncThunk(
  "recipe/fetchSingleRecipes",
  async (recipeId) => {
    try {
      const { data } = await fetchData(ENDPOINTS.LOOKUP, { i: recipeId });
      let recipeData = extractSingleRecipeData(data);
      return recipeData;
    } catch (error) {
      throw Error("Failed to fetch single recipe");
    }
  }
);
