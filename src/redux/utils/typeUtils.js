import { createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINTS } from "../../api/apiConstants";
import { extractRecipeData } from "../../utils/helpers";
import fetchData from "../../api/axios";

export const fetchTypesRecipes = createAsyncThunk(
  "recipes/type/fetchRecipes",
  async (obj) => {
    const { typeData } = obj;
    let endpoint = '';
    let params = {};

    // Map cuisine names to TheMealDB area names
    const areaMap = {
      'American': 'American',
      'Asian': 'Asian',
      'Chinese': 'Chinese',
      'French': 'French',
      'Mexican': 'Mexican',
      'Middle Eastern': 'Middle Eastern',
      'Japanese': 'Japanese',
      'Italian': 'Italian',
      'British': 'British',
      'Canadian': 'Canadian',
      'Croatian': 'Croatian',
      'Dutch': 'Dutch',
      'Egyptian': 'Egyptian',
      'Filipino': 'Filipino',
      'Greek': 'Greek',
      'Indian': 'Indian',
      'Irish': 'Irish',
      'Jamaican': 'Jamaican',
      'Kenyan': 'Kenyan',
      'Malaysian': 'Malaysian',
      'Moroccan': 'Moroccan',
      'Polish': 'Polish',
      'Portuguese': 'Portuguese',
      'Russian': 'Russian',
      'Spanish': 'Spanish',
      'Thai': 'Thai',
      'Tunisian': 'Tunisian',
      'Turkish': 'Turkish',
      'Unknown': 'Unknown',
      'Vietnamese': 'Vietnamese'
    };

    console.log('Fetching recipes with typeData:', typeData);

    let areaName;
    // Handle different types from data.js
    switch (typeData.typeOf) {
      case 'meal':
        endpoint = ENDPOINTS.FILTER_BY_CATEGORY;
        params = { c: typeData.typeName };
        break;
      case 'dish':
        endpoint = ENDPOINTS.FILTER_BY_INGREDIENT;
        params = { i: typeData.typeName };
        break;
      case 'cuisine':
        endpoint = ENDPOINTS.FILTER_BY_AREA;
        // Convert the cuisine name to match TheMealDB's area name
        areaName = areaMap[typeData.typeName];
        if (!areaName) {
          console.error(`No matching area found for cuisine: ${typeData.typeName}`);
          return { data: [], nextPage: null };
        }
        params = { a: areaName };
        break;
      case 'category':
        endpoint = ENDPOINTS.FILTER_BY_CATEGORY;
        params = { c: typeData.typeName };
        break;
      case 'area':
        endpoint = ENDPOINTS.FILTER_BY_AREA;
        params = { a: typeData.typeName };
        break;
      case 'ingredient':
        endpoint = ENDPOINTS.FILTER_BY_INGREDIENT;
        params = { i: typeData.typeName };
        break;
      default:
        throw new Error(`Invalid type: ${typeData.typeOf}`);
    }

    console.log('Making API call to:', endpoint, 'with params:', params);

    try {
      // First, get the filtered results
      const { data: filteredData } = await fetchData(endpoint, params);
      console.log('Filtered API response:', filteredData);

      if (!filteredData.meals) {
        console.log('No meals found in response');
        return { data: [], nextPage: null };
      }

      // Then, fetch full recipe data for each meal
      const fullRecipes = await Promise.all(
        filteredData.meals.map(async (meal) => {
          const { data: fullData } = await fetchData(ENDPOINTS.LOOKUP, { i: meal.idMeal });
          return fullData.meals[0];
        })
      );

      console.log('Full recipes data:', fullRecipes);

      // Extract and format the recipe data
      const recipesData = extractRecipeData({ meals: fullRecipes });
      console.log('Extracted recipes data:', recipesData);
      return recipesData;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw new Error(`Failed to fetch ${typeData.typeOf} recipes: ${error.message}`);
    }
  }
);
