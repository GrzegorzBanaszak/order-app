<template>
  <header class="open-orders__header">
    <h4>Osoba zamawiająca</h4>
    <h4>Data zamówienia</h4>
    <h4>Ilość</h4>
    <h4>Koszt</h4>
    <h4>Status</h4>
    <h4>Detale</h4>
  </header>
  <open-orders-element
    v-if="$store.state.filteredOrders.length > 0"
    v-for="item in $store.state.filteredOrders"
    :key="item._id"
    :order="item"
  ></open-orders-element>
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
    @include orderGrid;
    h4 {
      text-align: center;
    }
    margin-bottom: 1rem;
  }
}
</style>
