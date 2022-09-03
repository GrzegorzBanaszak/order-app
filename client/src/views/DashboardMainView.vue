<template>
  <div class="main__chart">Wykres sprzedarzy</div>
  <div class="main__best--customers">
    <open-list
      :title="'Najlepsi klienci'"
      :icon="'CustomersBlueIcon'"
      :list="$store.state.data.bestCustomer"
    ></open-list>
  </div>
  <div class="main__best--commadity">
    <open-list
      :title="'Najczęściej zamawiane'"
      :icon="'PackageBlueIcon'"
      :list="$store.state.data.bestSales"
    ></open-list>
  </div>
  <div class="main__orders">Ostatnio dodane zamówienia</div>
</template>

<script lang="ts">
import OpenList from "@/components/OpenList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    OpenList,
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
