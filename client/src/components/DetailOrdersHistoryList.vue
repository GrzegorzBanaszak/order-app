<template>
  <div class="orders-history">
    <h1 class="orders-history__title">
      Histora zamówień <history-blue-icon></history-blue-icon>
    </h1>
    <div class="orders-history__info">
      <div>Numer zamówienia</div>
      <div>Data zamówienia</div>
      <div>Ilość</div>
      <div>Koszt</div>
      <div>Status</div>
      <div>Detale</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HistoryBlueIcon from "@/icons/HistoryBlueIcon.vue";

export default defineComponent({
  components: { HistoryBlueIcon },
});
</script>

<style lang="scss">
.orders-history {
  background-color: white;
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 3;
  grid-row-end: 5;
  padding: 1rem;
  &__title {
    @include item-detail-header;
  }
  &__info {
    margin: 1.4rem 0;
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr;
    div {
      text-align: center;
      font-weight: 500;
    }
  }
}
</style>
