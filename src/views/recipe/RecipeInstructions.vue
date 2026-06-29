<template>
  <div class="flex flex-col items-start">
    <h3 class="text-xl font-semibold mb-3 bg-[#E79801] p-2 text-white rounded-lg w-full text-left">Instructions</h3>

    <div
      v-for="step in instructionSteps"
      :key="step.title"
      class="text-justify mb-6"
    >
      <p class="font-bold mb-2">{{ step.title }}</p>
      <p class="whitespace-pre-line">{{ step.body }}</p>
    </div>
  </div>
</template>

<script>
import { useRecipesStore } from "../../stores/recipes";

export default {
  name: "RecipeInstructions",
  props: ["id"],
  setup() {
    // Esta subvista también lee la receta desde el store
    // y luego transforma el texto largo en pasos.
    const recipesStore = useRecipesStore();
    return { recipesStore };
  },

  computed: {
    // Busca la receta actual usando el id que llega por props
    recipe() {
      return this.recipesStore.getRecipeById(this.id);
    },

    // Convierte el texto largo en una lista de pasos :-) (NERD!)
    instructionSteps() {
      const text = this.recipe?.strInstructions;
      if (!text) return []; // por las dudas no haya información!

      // Normaliza los saltos de linea para trabajar siempre igual
      const normalized = text
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .trim();

      return normalized
        // Separa el texto cuando encuentra "step 1", "step 2", etc.
        .split(/(?=step\s+\d+)/i)
        .map(step => step.trim())
        .filter(Boolean)

        // Divide cada paso en titulo y contenido
        .map(step => {
          const lines = step.split("\n");
          const title = lines[0].trim();
          const body = lines.slice(1).join("\n").trim();

          return {
            // Pone la primera letra en mayuscula
            title: title.charAt(0).toUpperCase() + title.slice(1),
            body,
          };
        });
    }
  },
};
</script>
