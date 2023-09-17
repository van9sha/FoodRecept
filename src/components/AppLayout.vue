<script setup>
import {Back} from '@element-plus/icons-vue'
import {ROUTES_PATHS} from "@/constants/router";
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";

const props = defineProps({
  imgUrl:{
    type: String,
    required:true
  },
  backFunc: {
    type:Function,
  },
  isBackButtonVisible:{
    type:Boolean,
    default:true,
  }
})

const route = useRoute()
const router = useRouter()

const routeName = computed(() => route.name)


function goForMealRandom(){
  router.push(ROUTES_PATHS.MEAL_RANDOM);

  if (routeName.value === ROUTES_PATHS.MEAL_RANDOM){
    router.go();
  }
}
function goBack(){
  props.backFunc ? props.backFunc() : router.go(-1)
}
</script>

<template>
  <div class="root">
    <div :style='`background-image:url(${imgUrl})`' class="img"></div>
    <div class="main">
      <div class="btns">
        <el-button
            v-if="isBackButtonVisible"
            type="primary"
            :icon="Back"
            circle
            class="back"
            @click="goBack"
        />
        <el-button round class="btn"
        @click="goForMealRandom">
          Рандомное блюдо
        </el-button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import "../assets/styles/main"

.root
  display: flex
  min-height: 100vh
  background-color: $background

.img
  width: 45%
  background-repeat: no-repeat
  background-position: 50% 100%
  background-size: cover


.main
  position: relative
  width: 55%
  padding: 32px 40px

.btn
  position: absolute
  top: 32px
  right: 40px
  font-size: 16px
  font-family: sans-serif
  background-color: $accent
  border-color: $accent
  color: $text
  &:hover,
  &:active
    background-color: darken($accent,20%)
    border-color: darken($accent,20%)

.btns
  display: flex
  justify-content: space-between
  align-items: center

.back
  background-color: transparent
  border-color: #ffffff

  &:hover
    border-color: $accent


</style>