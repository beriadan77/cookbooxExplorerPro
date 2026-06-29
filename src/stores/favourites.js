import { defineStore } from "pinia";

// Guarda solo los datos que necesitamos para las cards, navegación y el planner
function buildFavouriteRecipe(recipe) {
  return {
    idMeal: String(recipe.idMeal),
    strMeal: recipe.strMeal,
    strMealThumb: recipe.strMealThumb,
    strArea: recipe.strArea,
    strCategory: recipe.strCategory,
  };
}

export const useFaveStore = defineStore("favourite", {
  state: () => ({
    // Array de faves, tal como en el ejercicio de los Pokemones
    favouriteRecipes: [],
  }),
  getters: {
    // Ojo: aquí ya no sirve includes porque favouriteRecipes guarda objetos, no ids sueltos
    isFavourite: (state) => (recipeID) => {
      return state.favouriteRecipes.some(
        (recipe) => recipe.idMeal === String(recipeID),
      );
    },

    // Cantidad total de recetas favoritas
    howMany: (state) => state.favouriteRecipes.length,
  },
  actions: {
    // El toggle siempre compara por idMeal, así funciona igual desde recipe, card y home
    toggleFavourite(recipe) {
      const recipeID = String(recipe.idMeal);

      // findIndex nos da la posición exacta del objeto que coincide por idMeal
      const index = this.favouriteRecipes.findIndex(
        (savedRecipe) => savedRecipe.idMeal === recipeID,
      );

      if (index !== -1) {
        // Si ya existe -> quitarla
        this.favouriteRecipes.splice(index, 1);
      } else {
        // Si no existe -> guardarla con los datos necesarios
        this.favouriteRecipes.push(buildFavouriteRecipe(recipe));
      }
    },
    clearFaves() {
      this.favouriteRecipes = [];
    },
  },
});
