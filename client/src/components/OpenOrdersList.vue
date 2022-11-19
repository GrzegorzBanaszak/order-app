<template>
  <header class="open-orders__header">
    <h4>Osoba zamawiająca</h4>
    <h4>Data zamówienia</h4>
    <h4>Ilość</h4>
    <h4>Koszt</h4>
    <h4>Status</h4>
    <h4>Detale</h4>
  </header>
  <div class="open-orders__container">
    <open-orders-element
      v-if="$store.state.openState.filteredOrders.length > 0"
      v-for="item in $store.state.openState.filteredOrders"
      :key="item.id"
      :order="item"
    ></open-orders-element>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OpenOrdersElement from "./OpenOrdersElement.vue";

export default defineComponent({
  components: {
    OpenOrdersElement,
  },
});
</script>

<style lang="scss">
.open-orders {
  &__header {
    display: none;
    h4 {
      text-align: center;
    }
    margin: 1rem 0.7rem;
  }
  &__container {
    overflow-y: auto;
    @include scrollbars(5px, #ccc, white);
  }
}
@include lg {
  .open-orders {
    &__header {
      @include orderGrid;
      h4 {
        text-align: center;
      }
      margin: 1rem 0.7rem;
    }
    &__container {
      max-height: 90%;
      overflow-y: auto;
      @include scrollbars(5px, #ccc, white);
      padding-bottom: 1.4rem;
    }
  }
}
</style>
