import { defineStore } from "pinia";
import { DAYS, MEAL_TYPES } from "../config.js";

export const usePlannerStore = defineStore("pinia", {
  state: () => ({
    fiveDays: false,
    monday: {
      breakfast: null,
      lunch: null,
      snack: null,
      dinner: null,
    },
    tuesday: {
      breakfast: null,
      lunch: null,
      snack: null,
      dinner: null,
    },
    wednesday: {
      breakfast: null,
      lunch: null,
      snack: null,
      dinner: null,
    },
    thursday: {
      breakfast: null,
      lunch: null,
      snack: null,
      dinner: null,
    },
    friday: {
      breakfast: null,
      lunch: null,
      snack: null,
      dinner: null,
    },
    saturday: {
      breakfast: null,
      lunch: null,
      snack: null,
      dinner: null,
    },
    sunday: {
      breakfast: null,
      lunch: null,
      snack: null,
      dinner: null,
    },
  }),
  getters: {
    // Bueno, ahora con los meal types, esto se ha puesto mas complejo, si un dia tiene al menos 1 meal tipe con receta, ya se devuelve
    plannedDays: (state) => {
      return DAYS.filter((day) =>
        MEAL_TYPES.some((mealType) => state[day.key][mealType] !== null),
      ).length;
    },

    isDayEmpty: (state) => (dayKey) => {
      return MEAL_TYPES.every((mealType) => state[dayKey][mealType] === null);
    },

    // Más cómodo para estilos: true si ese día tiene al menos 1 receta asignada
    dayHasPlans: (state) => (dayKey) => {
      return MEAL_TYPES.some((mealType) => state[dayKey][mealType] !== null);
    },

    // lo mismo, ahora con meal types significa que una sola receta en en un 'slot' de meal type ya se consideraría "adentro".
    emptyDays: (state) => {
      return DAYS.filter((day) =>
        MEAL_TYPES.every((mealType) => state[day.key][mealType] === null),
      );
    },

    assignedMealsCount: (state) => {
      let total = 0;

      DAYS.forEach((day) => {
        MEAL_TYPES.forEach((mealType) => {
          if (state[day.key][mealType] !== null) {
            total++;
          }
        });
      });

      return total;
    },

    daysShowing() {
        return this.fiveDays;
    }
  },
  actions: {
    // La posición real en el planner ya no es solo el día: ahora es dayKey + mealType
    assignMeal(dayKey, mealType, recipe) {
      this[dayKey][mealType] = recipe;
    },

    // Devuelve la receta exacta guardada en ese slot concreto
    whichMeal(dayKey, mealType) {
      return this[dayKey][mealType];
    },

    removeMeal(dayKey, mealType) {
      const removedMeal = this[dayKey][mealType];
      this[dayKey][mealType] = null;
      return removedMeal;
    },

    clearPlanner() {
      // Recorremos las 2 dimensiones del planner para vaciar todos los slots
      DAYS.forEach((day) => {
        MEAL_TYPES.forEach((mealType) => {
          this[day.key][mealType] = null;
        });
      });
    },
    clearDay(dayKey) {
      // Recorremos las 2 dimensiones del planner para vaciar todos los slots
      MEAL_TYPES.forEach((mealType) => {
        this[dayKey][mealType] = null;
      });
    },
    toggleDays() {
        this.fiveDays = !this.fiveDays;
    }
  },
});
