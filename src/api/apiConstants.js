export const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// TheMealDB API endpoints
export const ENDPOINTS = {
  SEARCH: "/search.php",
  LOOKUP: "/lookup.php",
  RANDOM: "/random.php",
  LIST_CATEGORIES: "/categories.php",
  LIST_AREAS: "/list.php",
  LIST_INGREDIENTS: "/list.php",
  FILTER_BY_CATEGORY: "/filter.php",
  FILTER_BY_AREA: "/filter.php",
  FILTER_BY_INGREDIENT: "/filter.php",
};

// Remove Edamam specific constants since we're not using them anymore
// ... existing code ...