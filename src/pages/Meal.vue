<script setup>

import AppLayout from "@/components/AppLayout.vue";
import {useRoute} from "vue-router";
import {computed, ref} from "vue";
import axios from "axios";
import {MEAL_BY_ID} from "@/constants";


const route = useRoute();

const meal = ref(null);
const mealID = computed(() =>
    route.path.split('/').pop());

const ingredients = computed(() => {
  const ingredients = [];

  for (let i = 1; i <= 15; i++){
    if (!meal.value[`strIngredient${i}`]) break

    const ingredient = {}
    ingredient.name = meal.value[`strIngredient${i}`]
    ingredient.measure = meal.value[`strMeasure${i}`]

    ingredients.push(ingredient)
  }
  return ingredients;
})

async function getMeal () {
    const data = await axios.get(`${MEAL_BY_ID}${mealID.value}`)
    meal.value = data?.data?.meals[0]
}
getMeal();

function UpperFirstLetter(string){
    const capitalizedFirst = string[0].toUpperCase();
    const rest = string.slice(1);

    return capitalizedFirst + rest;

}

</script>

<template>
  <div v-if='meal' class="wrap">
    <AppLayout :img-url="meal.strMealThumb">
      <div class="wrapper">
        <div class="info">
          <div class="title">Блюдо {{ meal.strMeal }}</div>
          <div class="line"></div>
          <div class="list">
            <div
                v-for="(item, key) in ingredients"
                :key="key" class="list-item"
            >
              {{ UpperFirstLetter(item.name) }}
              <template v-if="item.measure">
                |
                {{ UpperFirstLetter(item.measure) }}
              </template>
            </div>
          </div>
          <div class="instructions">
            {{ meal.strInstructions }}
          </div>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<style scoped>
@import "../assets/styles/main.sass";
</style>