<template>
  <div class="flex w-full flex-col gap-4">
    <div class="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
      <div class="w-full max-w-xs">
        <!-- Aquí pasa lo mismo que en SearchView:
        v-model usa la computed selectedArea de abajo para leer y escribir -->
        <div class="flex gap-4 items-baseline">
          <h3 class="text-lg font-black text-nowrap">Filter by ethnicity:</h3>
          <select
            id="newArea"
            v-model="selectedArea"
            class="cursor-pointer font-black min-h-12 w-full appearance-none rounded-lg border-2 border-[#E79801] bg-gray-200 px-3 py-2 text-center text-sm leading-tight text-black focus:border-[#E79801] focus:outline-none focus:ring-2 focus:ring-[#E79801]/30 hover:bg-[#E79801] hover:text-white transition-all duration-300 shadow-inner shadow-orange-300 active:shadow-gray-500"
          >
            <!-- optgroup sirve para agrupar visualmente las opciones, pero no se puede seleccionar -->
            <optgroup
              v-for="group in areaGroups"
              :key="group.label"
              :label="group.label"
            >
              <option
                v-for="option in group.options"
                :key="option.value"
                :value="option.value"
                class="text-center"
              >
                {{ option.label }}
              </option>
            </optgroup>
          </select>
        </div>
      </div>

      <SearchView class="flex-1" />
    </div>

    <ul
      v-if="!recipesStore.loading && !recipesStore.error && recipes.length"
      class="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <li v-for="recipe in recipes" :key="recipe.idMeal" class="w-full">
        <router-link
          :to="`/recipe/${recipe.idMeal}`"
          class="block h-full w-full"
        >
          <RecipeCard :data="recipe" />
        </router-link>
      </li>
    </ul>
    <LoadingState v-else-if="recipesStore.loading" min-height-class="min-h-[32rem]" />
    <ErrorState
      v-else-if="recipesStore.error"
      title="Recipes unavailable"
      message="We couldn't load recipes right now."
      min-height-class="min-h-[32rem]"
    />
    <EmptyState
      v-else
      :title="emptyTitle"
      :message="emptyMessage"
      min-height-class="min-h-[32rem]"
    />
  </div>
</template>

<script>
import { AREA_GROUPS } from "../config.js";
import EmptyState from "../components/EmptyState.vue";
import ErrorState from "../components/ErrorState.vue";
import LoadingState from "../components/LoadingState.vue";
import RecipeCard from "../components/RecipeCard.vue";
import SearchView from "./SearchView.vue";
import { useRecipesStore } from "../stores/recipes.js";

export default {
  name: "RecipeGrid",
  components: {
    EmptyState,
    ErrorState,
    LoadingState,
    RecipeCard,
    SearchView,
  },
  setup() {
    // Esta vista vive casi entera del store de recetas,
    // así que lo sacamos aquí y lo dejamos listo para usar.
    const recipesStore = useRecipesStore();
    return { recipesStore };
  },
  computed: {
    // Los grupos del select viven en config para no dejar la vista llena de opciones hardcodeadas
    areaGroups() {
      return AREA_GROUPS;
    },
    recipes() {
      return this.recipesStore.recipes;
    },
    // Si el usuario está buscando por texto, el mensaje vacío debería explicarlo
    emptyTitle() {
      return this.recipesStore.searchTerm.trim()
        ? "No recipes found"
        : "No recipes available";
    },
    emptyMessage() {
      const searchTerm = this.recipesStore.searchTerm.trim();

      return searchTerm
        ? `We couldn't find matches for "${searchTerm}".`
        : "Try a different ethnicity filter.";
    },
    // También tuve que mirarlo porque no sale "natural" al principio:
    // este select no usa un data local, sino una computed con get/set.
    // Así el valor visible del select y el valor guardado en el store
    // siempre van de la mano.
    selectedArea: {
      get() {
        // get: le da al select el país actual guardado en el store
        return this.recipesStore.selectedArea;
      },
      set(newArea) {
        // set: cuando el usuario cambia la opción,
        // no solo cambiamos el texto: aprovechamos para traer las recetas nuevas.
        this.recipesStore.fetchRecipesByArea(newArea);
      },
    },
  },
  mounted() {
    // Carga inicial usando el país por defecto guardado en el store
    this.recipesStore.fetchRecipesByArea(this.recipesStore.selectedArea);
  },
};
</script>
