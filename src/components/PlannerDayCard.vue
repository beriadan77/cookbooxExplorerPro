<template>
  <div
    :class="
      hasPlansForDay
        ? 'border-[#E79801] bg-gradient-to-b from-[#fff7b3] via-[#62b1db] via-50% to-[#5371de] transition-all duration-500 mix-blend-add shadow-lg shadow-orange-300'
        : 'border-gray-300 bg-gray-100'
    "
    class="border-4 rounded-xl w-full"
  >
    <div
      :class="hasPlansForDay ? 'bg-[#E79801] shadow-inner shadow-orange-300' : 'bg-gray-400/60 shadow-inner shadow-gray-400'"
      class="flex items-center gap-2 p-2 rounded-t-lg "
    >
      <h3 class="flex-1 text-black font-black text-lg text-center truncate">
        {{ day.label }}
      </h3>

      <AppIconButton
        v-if="hasPlansForDay"
        @click="plannerStore.clearDay(day.key)"
        extra-classes="h-7 w-7 shrink-0 border-black/20 bg-white/70 text-sm hover:bg-white hover:text-[#E79801]"
      >
        <FontAwesomeIcon :icon="faXmark" />
      </AppIconButton>
    </div>
    <div
      v-for="slot in daySlots"
      :key="slot.mealType"
      :class="hasPlansForDay ? 'bg-transparent' : 'bg-gray-200'"
      class="rounded-xl shadow-inner shadow-gray-400overflow-hidden p-2 capitalize text-black text-lg"
    >
      <h4>{{ slot.mealType }}</h4>
      <div class="mt-2 flex items-stretch gap-2">
        <select
          :class="
            slot.recipe
              ? 'bg-[#E79801] text-white border-[#E79801] font-black'
              : 'bg-gray-200 text-black border-[#E79801] border-dashed shadow-inner shadow-gray-400'
          "
          class="cursor-pointer min-h-12 w-full appearance-none rounded-lg border-2 px-3 py-2 text-center text-sm leading-tight focus:border-[#E79801] focus:outline-none focus:ring-2 focus:ring-[#E79801]/30 hover:bg-white hover:text-[#E79801] transition-all duration-300 shadow-inner shadow-orange-300"
          :value="slot.recipe?.idMeal || ''"
          @change="handleMealSelection(slot.mealType, $event.target.value)"
        >
          <option value="" class="text-center">Pick one</option>
          <option
            v-for="recipe in faves"
            :key="recipe.idMeal"
            :value="recipe.idMeal"
          >
            {{ recipe.strMeal }}
          </option>
          <option value="go-to-recipes" class="text-center">
            Get one from Recipes
          </option>
        </select>

        <router-link
          v-if="slot.recipe"
          :to="`/recipe/${slot.recipe.idMeal}`"
          class="flex min-h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-[#E79801] bg-[#E79801] text-3xl font-black leading-none text-white transition-all duration-300 hover:bg-white hover:text-[#E79801]"
        >
          <span>&gt;</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AppIconButton from "./AppIconButton.vue";
import { MEAL_TYPES } from "../config.js";
import { usePlannerStore } from "../stores/planner.js";

export default {
  name: "PlannerDayCard",
  components: {
    AppIconButton,
    FontAwesomeIcon,
  },
  props: {
    day: {
      type: Object,
      required: true,
    },
    faves: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    mealTypes() {
      return MEAL_TYPES;
    },
    // Dejamos esta comprobación en computed para no repetir dayHasPlans(day.key) por todo el template
    hasPlansForDay() {
      return this.plannerStore.dayHasPlans(this.day.key);
    },
    // Preparamos cada slot con su receta para no repetir slotRecipe(mealType) varias veces en el template
    daySlots() {
      return this.mealTypes.map((mealType) => ({
        mealType,
        recipe: this.slotRecipe(mealType),
      }));
    },
  },
  setup() {
    // Aquí solo necesitamos el store del planner y el icono de la X.
    // Al devolverlos, ya los podemos usar en template, computed y methods.
    const plannerStore = usePlannerStore();
    return { plannerStore, faXmark };
  },
  methods: {
    // Helper para no repetir plannerStore.whichMeal(...) por todo el template
    slotRecipe(mealType) {
      return this.plannerStore.whichMeal(this.day.key, mealType);
    },
    // El select devuelve un id; aquí lo volvemos a convertir en el objeto receta completo
    handleMealSelection(mealType, selectedRecipeId) {
      if (!selectedRecipeId) {
        this.plannerStore.removeMeal(this.day.key, mealType);
        return;
      }

      // Este value no es una receta real:
      // lo usamos como atajo para mandar al usuario a la vista de Recipes.
      if (selectedRecipeId === "go-to-recipes") {
        this.$router.push("/recipes");
        return;
      }

      const selectedRecipe = this.faves.find(
        (recipe) => recipe.idMeal === String(selectedRecipeId),
      );

      if (!selectedRecipe) return;

      this.plannerStore.assignMeal(this.day.key, mealType, selectedRecipe);
    },
  },
};
</script>

<style></style>
