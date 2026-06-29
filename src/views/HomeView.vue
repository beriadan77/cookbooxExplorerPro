<template>
  <div class="mt-4 flex w-full flex-col text-left">
    <!-- ------------------- -->
    <!-- RANDOM MEAL         -->
    <!-- ------------------- -->
    <section class="flex w-full flex-col">
      <div class="flex justify-between items-end">
        <h2 class="font-black text-2xl">Random meal of the day</h2>
        <AppButton
          @click="loadRandomRecipe"
          extra-classes="justify-center"
        >
          Give me another
        </AppButton>
      </div>
      <LoadingState v-if="loading" min-height-class="min-h-96 md:h-96" />
      <ErrorState
        v-else-if="error"
        title="Random recipe failed"
        message="We couldn't load a random recipe right now."
        min-height-class="min-h-96 md:h-96"
      />

      <router-link
        v-else-if="randomRecipe"
        :to="`/recipe/${randomRecipe.idMeal}`"
        class="mt-4 block w-full md:h-96"
      >
        <!-- Misma RecipeCard, pero en modo ancho para que la random ocupe toda la fila -->
        <RecipeCard :data="randomRecipe" :featured="true" />
      </router-link>
    </section>

    <!-- ------------------- -->
    <!-- FAVOURITES          -->
    <!-- ------------------- -->
    <section class="mt-16 w-full">
      <div class="flex justify-between items-end pb-4">
        <h2 class="font-black text-2xl">
          Your Favourites ({{ faveStore.howMany }})
        </h2>
        <AppButton
          v-if="faveStore.howMany > 0"
          @click="faveStore.clearFaves()"
          extra-classes="justify-center"
        >
          Clear faves
        </AppButton>
      </div>
      <EmptyState
        v-if="!favouriteRecipes.length"
        title="No favourites yet"
        message="Visit Recipes or use the random meal section to start saving dishes you love."
        min-height-class="min-h-96"
      />

      <ul
        v-else
        class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <li
          v-for="faved in favouriteRecipes"
          :key="faved.idMeal"
          class="w-full"
        >
          <router-link
            :to="`/recipe/${faved.idMeal}`"
            class="block h-full w-full"
          >
            <RecipeCard :data="faved" />
          </router-link>
        </li>
      </ul>
    </section>

    <!-- ------------------- -->
    <!-- YOUR WEEK (PLANNER) -->
    <!-- ------------------- -->
    <section class="mt-16 w-full">
      <div class="flex flex-col justify-between items-start pb-4 gap-4 lg:flex-row">
        <div class="flex flex-col w-full">
        <h2 class="font-black text-2xl text-nowrap">
          Your Week ({{ plannerStore.assignedMealsCount }} meals assigned of 28)
        </h2>
        <p class="text-balance">You can add recipes to the Planner once they've been marked as Favourites. Recipes will be saved on the Planner even if you unfavourite them!</p>
        </div>

        <div class="flex justify-between w-full md:justify-end gap-2">
          <div class="flex gap-2 items-baseline">
            <p>Week format</p>
            <AppButton
              v-if="plannerStore.daysShowing"
              @click="plannerStore.toggleDays"
              extra-classes="min-w-28 justify-center"
            >
              5 Days
            </AppButton>
            <AppButton
              v-else
              @click="plannerStore.toggleDays"
              extra-classes="min-w-28 justify-center"
            >
              7 Days
            </AppButton>
          </div>

          <div>
            <AppButton
              v-if="plannerStore.assignedMealsCount > 0"
              @click="plannerStore.clearPlanner"
              extra-classes="justify-center"
            >
              Clear all
            </AppButton>
          </div>
        </div>
      </div>

      <ul
        :class="plannerStore.daysShowing ? 'xl:grid-cols-5' : 'xl:grid-cols-7'"
        class="grid w-full grid-cols-1 gap-2 md:grid-cols-3"
      >
        <li v-for="day in visibleDays" :key="day.key" class="w-full pb-4">
          <PlannerDayCard :day="day" :faves="favouriteRecipes" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { DAYS } from "../config.js";
import AppButton from "../components/AppButton.vue";
import EmptyState from "../components/EmptyState.vue";
import ErrorState from "../components/ErrorState.vue";
import LoadingState from "../components/LoadingState.vue";
import { useFaveStore } from "../stores/favourites.js";
import { useRecipesStore } from "../stores/recipes.js";
import { usePlannerStore } from "../stores/planner.js";

import PlannerDayCard from "../components/PlannerDayCard.vue";
import RecipeCard from "../components/RecipeCard.vue";

export default {
  name: "Home",
  components: {
    AppButton,
    EmptyState,
    ErrorState,
    LoadingState,
    PlannerDayCard,
    RecipeCard,
  },
  data() {
    return {
      error: false,
      loading: false,
    };
  },
  setup() {
    // setup() es otro sitio donde Vue nos deja "preparar cosas"
    // para usarlas luego en el template y en computed/methods.
    // Aquí saco los stores y los devuelvo para poder usar nombres como
    // faveStore, recipesStore o plannerStore directamente en esta vista.
    const faveStore = useFaveStore();
    const recipesStore = useRecipesStore();
    const plannerStore = usePlannerStore();
    return { faveStore, recipesStore, plannerStore };
  },
  computed: {
    days() {
      return DAYS;
    },
    randomRecipe() {
      return this.recipesStore.randomRecipe;
    },
    favouriteRecipes() {
      return this.faveStore.favouriteRecipes;
    },
    // Si fiveDays está activo, recortamos el array visualmente,
    // pero el store sigue guardando también sábado y domingo.
    visibleDays() {
      return this.plannerStore.daysShowing ? this.days.slice(0, 5) : this.days;
    },
  },
  methods: {
    // La random sale de otro endpoint y la guardamos aparte, no dentro de recipes normales
    async loadRandomRecipe() {
      this.error = false;
      this.loading = true;
      try {
        const recipe = await this.recipesStore.fetchRandomRecipe();
        this.error = !recipe;
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    await this.loadRandomRecipe();
  },
};
</script>

<style></style>
