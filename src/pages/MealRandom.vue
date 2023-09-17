<script setup>
import {computed, ref} from "vue";
import axios from "axios";
import {INGREDIENT_PIC, MEAL_RANDOM} from "@/constants";
import 'swiper/css';
import AppLayout from "@/components/AppLayout.vue";
import {Swiper,SwiperSlide} from "swiper/vue";

const meal = ref(null)

const ingredients = computed(() => {
  const ingredients = []
  for (let i = 1; i <= 15; i++){
    if (!meal.value[`strIngredient${i}`]) break

    const ingredient = meal.value[`strIngredient${i}`]

    ingredients.push(ingredient)
  }
  return ingredients;
})

async function getRandomMeal(){
  const data = await axios.get(`${MEAL_RANDOM}`)
  meal.value = data?.data?.meals[0]
}
getRandomMeal()
</script>

<template>
  <div v-if='meal' class="wrap">
    <AppLayout :imgUrl='meal.strMealThumb'>
      <div class="wrapper">
        <div class="info">
          <div class="title">{{ meal.strMeal }}</div>
          <div class="line"></div>
          <div class="slider">
            <swiper :slides-per-view="3" :space-between="50"
                    class="swiper">
              <swiper-slide
                  v-for="(ingredient,key) in ingredients"
                  :key="key"
              >
                <img :src="`${INGREDIENT_PIC}${ingredient}-Small.png`" alt="{{ingredient}}">
                <div class="name">
                  {{ingredient}}
                </div>
              </swiper-slide>
              <div class="swiper-slide">Slide 1</div>
            </swiper>
          </div>
          <div class="instructions">
            {{ meal.strInstructions }}
          </div>
        </div>

      </div>
    </AppLayout>
  </div>
</template>

<style scoped lang="sass">
@import "../assets/styles/main"

.slider
  padding: 50px 0

.swiper
  width: 586px

.name
  padding-top: 20px

</style>