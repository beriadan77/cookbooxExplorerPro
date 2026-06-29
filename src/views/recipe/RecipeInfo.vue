<template>
  <div class="flex flex-col items-start">
    <h3 class="text-xl font-semibold mb-3 bg-[#E79801] p-2 text-white rounded-lg w-full text-left">General Information</h3>
    <div class="flex flex-wrap gap-x-6 gap-y-3 text-md text-gray-800">
      <div class="flex items-center gap-2 whitespace-nowrap">
        <p>Category:</p>
        <span class="font-black">{{ recipe.strCategory }}</span>
      </div>

      <div class="flex items-center gap-2 whitespace-nowrap">
        <p>Ethnic:</p>
        <span class="font-black">{{ recipe.strArea }}</span>
      </div>

      <div class="flex items-center gap-2whitespace-nowrap">
        <a :href="recipe.strSource" class="underline hover:text-[#E79801]">Visit source site</a>
      </div>

      <div class="flex items-center gap-2 whitespace-nowrap">
        <p>Last updated:</p>
        <span class="font-black">{{ lastUpdated }}</span>
      </div>

      <div class="flex items-center gap-2 whitespace-nowrap">
        <p>Recipe ID:</p>
        <span class="font-black">{{ id }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useRecipesStore } from "../../stores/recipes";

export default {
  name: "RecipeInfo",
  props: ["id"],
  setup() {
    // Aunque esta sea una nested view pequeña,
    // necesita entrar al store para leer la receta actual.
    const recipesStore = useRecipesStore();
    return { recipesStore };
  },
  computed: {
    recipe() {
      return this.recipesStore.getRecipeById(this.id);
    },
    lastUpdated() {
      return this.recipe?.dateModified?.split(" ")[0] || "Unknown";
    },
  },
};
</script>
