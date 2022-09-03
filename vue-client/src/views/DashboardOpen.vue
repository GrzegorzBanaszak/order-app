<template>
  <div class="main__chart">Wykres sprzedarzy</div>
  <div class="main__best--customers">Najlepsi klienci</div>
  <div class="main__best--commadity">
    <open-list :icon="'PackageBlueIcon'" :list="data.bestSales"></open-list>
  </div>
  <div class="main__orders">Ostatnio dodane zamówienia</div>
</template>

<script>
import { data } from "@/fakeData";
import OpenList from "@/components/OpenList.vue";

export default {
  components: { OpenList },
  data() {
    return {
      data,
    };
  },
};
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
