export const THE_MEAL_AREA_PATH = "https://www.themealdb.com/api/json/v1/1/filter.php?a=";
export const THE_MEAL_LOOKUP_PATH = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
export const THE_MEAL_SEARCH_PATH = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
export const THE_MEAL_INGREDIENT_PATH = "https://www.themealdb.com/images/ingredients/";
export const THE_MEAL_RANDOM_ONE = "https://www.themealdb.com/api/json/v1/1/random.php";

export const DAYS = [
  {key: "monday", label: "Monday"},
  {key: "tuesday", label: "Tuesday"},
  {key: "wednesday", label: "Wednesday"},
  {key: "thursday", label: "Thursday"},
  {key: "friday", label: "Friday"},
  {key: "saturday", label: "Saturday"},
  {key: "sunday", label: "Sunday"}
];

export const MEAL_TYPES = [
    "breakfast",
    "lunch",
    "snack",
    "dinner"
];

export const AREA_GROUPS = [
  {
    label: "Europe",
    options: [
      { value: "Spanish", label: "Spanish" },
      { value: "Italian", label: "Italian" },
      { value: "Croatia", label: "Croatian" },
      { value: "French", label: "French" },
      { value: "Netherlands", label: "Dutch" },
      { value: "Norway", label: "Norwegian" },
      { value: "Poland", label: "Polish" },
      { value: "United Kingdom", label: "British" },
      { value: "Ukraine", label: "Ukrainian" },
    ],
  },
  {
    label: "Africa",
    options: [{ value: "Egypt", label: "Egyptian" }],
  },
  {
    label: "America",
    options: [
      { value: "Argentina", label: "Argentinian" },
      { value: "Canada", label: "Canadian" },
      { value: "Mexican", label: "Mexican" },
      { value: "United States", label: "American" },
      { value: "Venezuela", label: "Venezuelan" },
    ],
  },
  {
    label: "Asia",
    options: [
      { value: "Cambodia", label: "Cambodian" },
      { value: "China", label: "Chinese" },
      { value: "India", label: "Indian" },
      { value: "Vietnam", label: "Vietnamese" },
    ],
  },
];
