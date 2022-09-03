<template>
  <header :class="classType">
    <h2>Agrohandel</h2>
    <div class="avatar">
      <p class="avatar__username">Email</p>
      <div class="avatar__image">GB</div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    classType: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss">
.avatar {
  display: flex;
  gap: 2rem;
  align-items: center;

  &__image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #d9d9d9;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
