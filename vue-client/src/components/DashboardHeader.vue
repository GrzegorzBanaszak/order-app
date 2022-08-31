<template>
  <header :class="classType">
    <h2>Agrohandel</h2>
    <div class="avatar">
      <p class="avatar__username">{{ store.user.email }}</p>
      <div class="avatar__image">GB</div>
    </div>
  </header>
</template>

<script>
import { store } from "../store";

export default {
  props: {
    classType: String,
  },
  data() {
    return { store };
  },
};
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
