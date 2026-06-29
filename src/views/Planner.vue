<script>
import { DAYS } from "../config.js";
import AppButton from "../components/AppButton.vue";
import { useFaveStore } from "../stores/favourites.js";
import { usePlannerStore } from "../stores/planner.js";
import PlannerDayCard from "../components/PlannerDayCard.vue";

export default {
  name: "Planner",
  components: {
    AppButton,
    PlannerDayCard,
  },
  setup() {
    // En esta vista usamos dos stores:
    // favoritos para rellenar los selects y planner para leer/editar la semana.
    const faveStore = useFaveStore();
    const plannerStore = usePlannerStore();
    return { faveStore, plannerStore };
  },
  computed: {
    days() {
      return DAYS;
    },
    favouriteRecipes() {
      return this.faveStore.favouriteRecipes;
    },
    // Igual que en Home: si el modo 5 días está activo,
    // aquí solo mostramos lunes-viernes.
    visibleDays() {
      return this.plannerStore.daysShowing ? this.days.slice(0, 5) : this.days;
    },
  },
};
</script>

<template>
  <!-- ------------------- -->
  <!-- YOUR WEEK (PLANNER) -->
  <!-- ------------------- -->
    <div class="mt-4 flex w-full flex-col text-left">
  <section class="mt-16 w-full">
    <div
      class="flex flex-col justify-between items-start pb-4 gap-4 lg:flex-row"
    >
      <div class="flex flex-col w-full">
        <h2 class="font-black text-2xl text-nowrap">
          Your Week ({{ plannerStore.assignedMealsCount }} meals assigned of 28)
        </h2>
        <p class="text-balance">
          You can add recipes to the Planner once they've been marked as
          Favourites. Recipes will be saved on the Planner even if you
          unfavourite them!
        </p>
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
