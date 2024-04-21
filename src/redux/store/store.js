import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipesSlice";
import typesReducer from "./typesSlice";

const rootReducer = {
  recipes: recipesReducer,
  types: typesReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
