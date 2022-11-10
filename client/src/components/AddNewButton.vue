<template>
  <router-link
    v-if="$store.state.openState.location.length === 3"
    class="button__container"
    :to="'/d/' + $store.state.openState.location[2] + '/add'"
    @mouseenter="showText = true"
    @mouseleave="showText = false"
  >
    <transition name="text">
      <span v-if="showText" class="button__text">Dodaj {{ text }}</span>
    </transition>

    <div class="button__icon">+</div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      text: "",
      showText: false,
    };
  },
  methods: {
    displayLocation() {
      switch (this.$route.path.split("/")[2]) {
        case "customers":
          this.text = "klienta";
          break;
        case "companies":
          this.text = "firme";
          break;
        case "commodities":
          this.text = "towar";
          break;
        case "suppliers":
          this.text = "dostawce";
          break;
        case "orders":
          this.text = "zamówienie";
          break;
        default:
          this.text = "";
          break;
      }
    },
  },
  mounted() {
    this.displayLocation();
  },
});
</script>

<style lang="scss">
.button {
  &__container {
    position: relative;
    cursor: pointer;
  }
  &__icon {
    display: flex;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #3f51b5;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    position: relative;
  }
  &__text {
    position: absolute;
    left: -14rem;
    /* transform: translateY(-50%);  */
    color: white;
    font-size: 1.5rem;
    padding: 0 1rem;
    border-radius: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: left;
    height: 4rem;
    width: 17rem;
    background-color: rgba(63, 81, 181, 0.8);
  }
}
.text {
  &-enter {
    &-from {
      opacity: 0;
      transform: translateX(20px);
    }
    &-to {
      opacity: 1;
      transform: translateX(0);
    }
    &-active {
      transition: all 0.4s ease-in;
    }
  }
  &-leave {
    &-from {
      opacity: 1;
      transform: translateX(0);
    }
    &-to {
      opacity: 0;
      transform: translateX(20px);
    }
    &-active {
      transition: all 0.4s ease-in;
    }
  }
}
</style>
