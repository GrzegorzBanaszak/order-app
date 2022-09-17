<template>
  <div class="main__chart">Wykres sprzedarzy</div>
  <div class="main__best--customers">
    <open-list
      :title="'Najlepsi klienci'"
      :icon="'CustomersBlueIcon'"
      :list="$store.state.openState.bestCustomers"
    ></open-list>
  </div>
  <div class="main__best--commadity">
    <open-list
      :title="'Najczęściej zamawiane'"
      :icon="'PackageBlueIcon'"
      :list="$store.state.openState.bestCommodities"
    ></open-list>
  </div>
  <div class="main__orders"><open-orders-list /></div>
</template>

<script lang="ts">
import OpenList from "@/components/OpenList.vue";
import OpenOrdersList from "@/components/OpenOrdersList.vue";
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    OpenList,
    OpenOrdersList,
  },
  setup() {
    const store = useStore();
    store.dispatch("getOrders");
    store.dispatch("getBestCustomers");
    store.dispatch("getBestCommodities");
  },
});
</script>

<style lang="scss">
.main {
  &__chart {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
    background-color: white;
  }
  &__orders {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 3;
    grid-row-end: 5;
    background-color: white;
    padding: 1rem;
  }
  &__best {
    &--customers {
      grid-row-start: 1;
      grid-row-end: 3;
      background-color: white;
      padding: 1rem;
    }
    &--commadity {
      grid-row-start: 1;
      grid-row-end: 3;
      background-color: white;
      padding: 1rem;
    }
  }
}
</style>
