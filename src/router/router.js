import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import RecipeGrid from "../views/RecipeGrid.vue";
import Recipe from "../views/Recipe.vue";
import RecipeLayout from "../views/recipe/RecipeLayout.vue";
import RecipeInfo from "../views/recipe/RecipeInfo.vue";
import RecipeIngredients from "../views/recipe/RecipeIngredients.vue";
import RecipeInstructions from "../views/recipe/RecipeInstructions.vue";
import Planner from "../views/Planner.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/recipes", name: "recipes", component: RecipeGrid },
  {
    path: "/recipe/:id",
    name: "recipe",
    component: Recipe,
    props: true,
    children: [
      {
        path: "",
        component: RecipeLayout,
        children: [
          {
            path: "",
            components: {
              info: RecipeInfo,
              ingredients: RecipeIngredients,
              instructions: RecipeInstructions,
            },
            props: {
              info: true,
              ingredients: true,
              instructions: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/planner",
    name: "planner",
    component: Planner,
  },
  { path: "/search", redirect: "/recipes" },
  { path: "/:pathMatch(.*)*", name: "not-found", component: NotFound },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
