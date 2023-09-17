import {defineStore} from "pinia";
import axios from "axios";
import {API_INGREDIENT, BASE_URL, MEAL_BY_ING_URL} from "@/constants/api";


export const useRootStore = defineStore('root', {
    state: () => ({
        ing_meals: [],
        ingredient: null,
        meals: []
    }),
    actions: {
        async getIngredient() {
            const data = await axios.get(`${BASE_URL}${API_INGREDIENT}`)
            this.ing_meals = data?.data?.meals

        },
        async getMeal(ingredient) {
            const data = await axios.get(`${MEAL_BY_ING_URL}${ingredient}`)
            this.meals = data?.data?.meals
        },
        setMeal(val) {
            this.meals = val;
        },
    }
})
