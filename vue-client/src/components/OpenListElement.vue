<template>
  <div class="open-list__element">
    <div class="open-list__element--name">{{ name }}</div>
    <div class="open-list__element--quantity">{{ quantity }}</div>
    <div><dotts-icon-vue /></div>
  </div>
</template>

<script>
import DottsIconVue from "@/icons/DottsIcon.vue";

export default {
  components: { DottsIconVue },
  props: {
    name: {
      type: String,
      default: "Element name",
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss">
.open-list {
  &__element {
    margin: 1.3rem 0;
    display: flex;
    align-items: center;
    &--name {
      width: 70%;
    }
    &--quantity {
      width: 20%;
      text-align: center;
    }
  }
}
</style>
