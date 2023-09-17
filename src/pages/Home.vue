<link rel="stylesheet" href="../assets/styles/main.sass">
<script setup>

import AppLayout from "@/components/AppLayout.vue";
import {useRootStore} from "@/stores/counter";
import {storeToRefs} from "pinia";
import MealThrumb from "@/components/MealThrumb.vue";

const rootStore = useRootStore();
rootStore.getIngredient();

const { ing_meals,meals,ingredient } = storeToRefs(rootStore);
function getMeal(){
  rootStore.getMeal(rootStore.ingredient)
}

function removeIngredient(){
  rootStore.setMeal(null)
}
</script>
<template>
  <AppLayout imgUrl="src/assets/img/food_main.png"
             :backFunc="removeIngredient"
             :is-back-button-visible="!!ingredient"
  >
    <div class="wrapper">
      <div v-if="!ingredient || !meals" class="info">
        <div class="title">Выбери блюдо</div>
        <div class="line"></div>
        <div class="select-wrapper">
          <el-select
              v-model="rootStore.ingredient"
              class="m-2"
              placeholder="Select"
              filterable
              allow-create
              size="large"
              @change="getMeal"
          >
            <el-option
                v-for="item in ing_meals"
                :key="item.strIngredient"
                :label="item.strIngredient"
                :value="item.strIngredient"
            />
          </el-select>
        </div>
        <div class="text">Представляем Вам выбор блюд на любой вкус. Выберите любое блюдо по вашим излюбленным ингредиентам
        </div>
      </div>
      <div v-else class="info">
        <div class="title">Коктейли с {{ ingredient }}</div>
        <div class="line"></div>
        <div class="meals">
          <MealThrumb
              v-for="meal in meals"
              :key="meal.idMeal"
              :meal="meal"
          >
          </MealThrumb>
        </div>
      </div>
    </div>
  </AppLayout>
</template>



<style lang="sass" scoped>
@import "../assets/styles/main.sass"
.select-wrapper
  padding-top: 40px

.select
  width: 260px

.text
  max-width: 516px
  margin: 0 auto
  padding-top: 30px
  line-height: 36px
  letter-spacing: 0.1em
  color: $textMuted

.meals
  display: flex
  flex-wrap: wrap
  align-items: center
  padding-top: 20px
  max-height: 400px
  overflow-y: auto
  margin-top: 20px
</style>