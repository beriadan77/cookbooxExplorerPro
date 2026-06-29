<template>
  <div>
    <h3
      class="text-xl font-semibold mb-3 bg-[#E79801] p-2 text-white rounded-lg w-full text-left"
    >
      Ingredients
    </h3>
    <div v-for="ingredient in ingredientsList" :key="ingredient.id" class="flex gap-4 text-left font-bold items-center">
        <img :src="ingredient.image" :alt="ingredient.alt" class="w-16 h-16">
        <p class="pb-1">{{ ingredient.measure }} {{ ingredient.name }}</p>
    </div>

  </div>
</template>
<script>
import { useRecipesStore } from "../../stores/recipes";
import { THE_MEAL_INGREDIENT_PATH } from "../../config.js";

export default {
  name: "RecipeIngredients",
  props: ["id"],
  setup() {
    // Igual que en RecipeInfo: sacamos el store aquí
    // para poder montar luego la lista de ingredientes.
    const recipesStore = useRecipesStore();
    return { recipesStore };
  },
  computed: {
    recipe() {
      return this.recipesStore.getRecipeById(this.id);
    },
    ingredientsList() {
      const recipe = this.recipe;
      if (!recipe) return []; // por las dudas no haya información!

      const list = [];

      for (let i = 1; i <= 20; i++) {
        let name = recipe[`strIngredient${i}`];
        let measure = recipe[`strMeasure${i}`];

        // Solo si hay un nombre de ingrediente, agregarlo a la lista
        if (name) {
          name = name.trim();
          if (measure) measure = measure.trim();

          // preparar ruta de la imagen del ingrediente en base a su nombre
          // busca más de un espacio (\s+) a nivel global (g) (no solo el primero) reemplaza por _
          const fileName = name.normalize().replace(/\s+/g, "_");
          const imageURL = `${THE_MEAL_INGREDIENT_PATH}${fileName}.png`;

          list.push({
            id: i,
            name: name,
            measure: measure,
            image: imageURL,
            alt: name,
          });
        }
      }
      return list;
    },
  },
};
</script>

<style></style>
