import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/pages/Home.vue";
import Meal from "@/pages/Meal.vue";
import MealRandom from "@/pages/MealRandom.vue";
import {ROUTES_PATHS} from "@/constants/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS.HOME,
      name: ROUTES_PATHS.HOME,
      component: Home
    },
    {
      path:ROUTES_PATHS.MEAL,
      name: ROUTES_PATHS.MEAL,
      component: Meal
    },
    {
      path:ROUTES_PATHS.MEAL_RANDOM,
      name: ROUTES_PATHS.MEAL_RANDOM,
      component: MealRandom
    }

  ]
})

export default router
