import { defineStore } from "pinia";
import {
  THE_MEAL_AREA_PATH,
  THE_MEAL_LOOKUP_PATH,
  THE_MEAL_RANDOM_ONE,
  THE_MEAL_SEARCH_PATH,
} from "../config.js";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: [],
    recipeDetails: {},
    randomRecipe: null,
    loading: false,
    error: false,
    selectedArea: "Spanish",
    searchTerm: "",
  }),
  getters: {
    getRecipeById: (state) => {
      return (id) => state.recipeDetails[String(id)] || null;
    },
  },
  actions: {
    async fetchRecipesByArea(area) {
      this.loading = true;
      this.error = false;

      try {
        // Guardamos el país actual para que el select y el store siempre vayan sincronizados
        this.selectedArea = area;
        this.searchTerm = "";

        // filter.php?a=... devuelve solo las recetas de ese "area" (país/cocina)
        const res = await fetch(`${THE_MEAL_AREA_PATH}${area}`);
        const data = await res.json();
        this.recipes = data.meals || [];
      } catch (error) {
        this.error = true;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchRecipeById(id) {
      const recipeId = String(id);

      // Cache simple: si ya tenemos esa receta, no repetimos fetch
      if (this.recipeDetails[recipeId]) {
        return this.recipeDetails[recipeId];
      }

      this.loading = true;
      this.error = false;

      try {
        const res = await fetch(`${THE_MEAL_LOOKUP_PATH}${recipeId}`);
        const data = await res.json();
        const recipe = data.meals?.[0];

        if (!recipe) return null;

        this.recipeDetails[recipeId] = recipe;
        return recipe;
      } catch (error) {
        this.error = true;
        console.error(error);
        return null;
      } finally {
        this.loading = false;
      }
    },

    async searchRecipesByName(searchText) {
      const normalizedSearch = searchText.trim();
      this.searchTerm = searchText;

      if (!normalizedSearch) {
        await this.fetchRecipesByArea(this.selectedArea);
        return;
      }

      this.loading = true;
      this.error = false;

      try {
        const res = await fetch(`${THE_MEAL_SEARCH_PATH}${normalizedSearch}`);
        const data = await res.json();
        this.recipes = data.meals || [];
      } catch (error) {
        this.error = true;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchRandomRecipe() {
      this.loading = true;
      this.error = false;

      try {
        // random.php ya devuelve la receta completa; no hace falta lookup extra
        const res = await fetch(THE_MEAL_RANDOM_ONE);
        const data = await res.json();
        const recipe = data.meals?.[0] || null;

        this.randomRecipe = recipe;
        return recipe;
      } catch (error) {
        this.error = true;
        console.error(error);
        return null;
      } finally {
        this.loading = false;
      }
    },
  },
});




// {"meals":[{"idMeal":"53158","strMeal":"Air fryer patatas bravas","strMealAlternate":null,"strCategory":"Vegetarian","strArea":"Spanish","strCountry":"Spain","strInstructions":"step 1\r\nSoak the potatoes in just-boiled water for 30 mins, then drain and leave to air-dry for 5 mins. Heat the air fryer to 200C. Tip the potatoes into a bowl and drizzle over 1 tbsp of the oil and add 1/2 tsp each of salt and freshly ground black pepper. Mix to coat the potatoes all over, then tip into the air fryer basket and cook for 20-30 mins until crisp and golden.\r\n\r\nstep 2\r\nMeanwhile, heat the remaining oil in a small pan over a medium-low heat and fry the onion for 8-10 mins until softened but not golden. Stir in the garlic and cook for a minute before adding the paprika and cooking for 30 seconds more. Stir in the tomato purée, cook for 1 min, then tip in the chopped tomatoes. Cook for 5-10 mins over a medium heat until thickened slightly.\r\n\r\nstep 3\r\nOnce the potatoes are cooked, tip out onto a platter and pour over the tomato sauce. Sprinkle with the basil leaves, then serve.","strMealThumb":"https://www.themealdb.com/images/media/meals/3m8yae1763257951.jpg","strTags":null,"strYoutube":"https://www.youtube.com/watch?v=kzLaw6PG2UY","strIngredient1":"Potatoes","strIngredient2":"Olive Oil","strIngredient3":"Onion","strIngredient4":"Garlic","strIngredient5":"Paprika","strIngredient6":"Tomato Puree","strIngredient7":"Tinned Tomatos","strIngredient8":"Basil Leaves","strIngredient9":"","strIngredient10":"","strIngredient11":"","strIngredient12":"","strIngredient13":"","strIngredient14":"","strIngredient15":"","strIngredient16":"","strIngredient17":"","strIngredient18":"","strIngredient19":"","strIngredient20":"","strMeasure1":"900g","strMeasure2":"3  tablespoons","strMeasure3":"1 chopped","strMeasure4":"1 clove peeled crushed","strMeasure5":"1 tblsp ","strMeasure6":"1 tblsp ","strMeasure7":"225g","strMeasure8":"To serve","strMeasure9":" ","strMeasure10":" ","strMeasure11":" ","strMeasure12":" ","strMeasure13":" ","strMeasure14":" ","strMeasure15":" ","strMeasure16":" ","strMeasure17":" ","strMeasure18":" ","strMeasure19":" ","strMeasure20":" ","strSource":"https://www.bbcgoodfood.com/recipes/air-fryer-patatas-bravas","strImageSource":null,"strCreativeCommonsConfirmed":null,"dateModified":"2025-11-16 01:49:18"}]}
