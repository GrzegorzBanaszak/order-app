<template>
  <div class="open-list__element">
    <div class="open-list__element--name">{{ name }}</div>
    <div class="open-list__element--quantity">{{ quantity }}</div>
    <router-link :to="`/d/${type}/${id}`">
      <info-black-icon />
    </router-link>
  </div>
</template>

<script lang="ts">
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";
import { defineComponent } from "vue";


export default defineComponent({
  components: { InfoBlackIcon },
  props: {
    name: {
      type: String,
      default: "Element name",
    },
    quantity: {
      type: Number,
      default: 0,
    },
    id:{
      type:String,
      required:true
    },
    type:{
      type:String,
      required:true
    }
  },
});
</script>

<style lang="scss">
.open-list {
  &__element {
    margin: 0.7rem  0.5rem;
    display: flex;
    align-items: center;
    &--name {
      width: 70%;
      font-size: 0.9rem;
    }
    &--quantity {
      width: 20%;
      text-align: center;
      font-size: 0.9rem;
    }
  }
}
</style>
