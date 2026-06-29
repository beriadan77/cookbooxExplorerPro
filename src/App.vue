<script>
import { usePlannerStore } from "./stores/planner.js";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar },
  setup() {
    // Aquí dejo el planner disponible a nivel app
    // para pruebas y por si luego el layout general lo necesita.
    const planner = usePlannerStore();
    return { planner };
  },
  methods: {},
  mounted() {
    // DEBUGGING vvv
    // getters tests
    // console.log("state:", this.planner.$state);
    // console.log("plannedDays:", this.planner.plannedDays);
    // console.log("emptyDay:", this.planner.emptyDays);
    // assignMeal test
    // this.planner.assignMeal('monday', 'recipeTest');
    // console.log("emptyDay:", this.planner.emptyDays);
    // console.log("Monday has meal?", this.planner.whichMeal('monday'));
    // removeMeal test
    // this.planner.assignMeal('monday', 'recipeTest');
    // console.log("Monday has meal?", this.planner.whichMeal('monday'));
    // console.log("Meal removed from Monday:", this.planner.removeMeal('monday'));
    // console.log("Monday has meal?", this.planner.whichMeal('monday'));
    // clearPlanner test
    // console.log("plannedDays:", this.planner.plannedDays);
    // this.planner.clearPlanner();
    // console.log("plannedDays after clearPlanner:", this.planner.plannedDays);
  },
};
</script>

<template>
  <nav class="w-full">
    <Navbar />
  </nav>

  <div
    class="flex flex-col w-screen relative left-1/2 -translate-x-1/2 h-full p-8 bg-gray-300"
  >
    <main class="flex container mx-auto w-full">
      <RouterView />
    </main>
  </div>

  <footer
    class="flex flex-col w-screen relative left-1/2 -translate-x-1/2 bg-[#F9B838] text-black py-4"
  >
    <p>@2026 Copyrgiht CookBook Group. All rights reserved.</p>
  </footer>
</template>
