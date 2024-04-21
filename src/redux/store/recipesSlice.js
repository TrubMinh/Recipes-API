import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";
import {
  fetchRecipes,
  fetchSearchRecipe,
  fetchSingleRecipe,
} from "../utils/recipeUtils";

const recipesAdapter = createEntityAdapter({});

const initialState = recipesAdapter.getInitialState({
  error: null,
  status: STATUS.IDLE,
  nextPage: null,
  searchResult: null,
  searchQuery: "",
  singleRecipe: null,
});

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },

    clearSearch(state) {
      state.searchResult = null;
    },
  },
  extraReducers(builder) {
    builder
      // handling fetching of all recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.nextPage = action.payload.nextPage;
        recipesAdapter.upsertMany(state, action.payload.data);
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })

      // handling fetching of single recipe
      .addCase(fetchSingleRecipe.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchSingleRecipe.fulfilled, (state, action) => {
        state.singleRecipe = action.payload;
        state.status = STATUS.SUCCEEDED;
      })
      .addCase(fetchSingleRecipe.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      })

      // handle recipe search by search terms
      .addCase(fetchSearchRecipe.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchSearchRecipe.fulfilled, (state, action) => {
        state.searchResult = action.payload.data;
        state.nextPage = action.payload.nextPage;
        state.status = STATUS.SUCCEEDED;
      })
      .addCase(fetchSearchRecipe.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export const { selectAll: selectAllRecipes } = recipesAdapter.getSelectors(
  (state) => state.recipes
);

export const getRecipesStatus = (state) => state.recipes.status;
export const getRecipesError = (state) => state.recipes.error;
export const getSearchQuery = (state) => state.recipes.searchQuery;
export const selectSearchResult = (state) => state.recipes.searchResult;
export const getRecipesNextPage = (state) => state.recipes.nextPage;
export const selectSingleRecipe = (state) => state.recipes.singleRecipe;

export const { setSearchQuery, clearSearch } = recipesSlice.actions;
export default recipesSlice.reducer;
