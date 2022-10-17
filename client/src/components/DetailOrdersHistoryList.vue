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
    <div
      v-if="$store.state.ordersState.ordersHistory.length > 0"
      v-for="item in $store.state.ordersState.ordersHistory"
      class="orders-history__element"
    >
      <detail-orders-history-element
        :order-info="item"
      ></detail-orders-history-element>
    </div>
    <div v-else class="orders-history__message">Brak zamówień</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HistoryBlueIcon from "@/icons/HistoryBlueIcon.vue";
import DetailOrdersHistoryElement from "./DetailOrdersHistoryElement.vue";

export default defineComponent({
  components: { HistoryBlueIcon, DetailOrdersHistoryElement },
  mounted() {
    const location = this.$route.path.split("/")[2];
    let type: string | null = null;

    switch (location) {
      case "customers":
        type = "customer";
        break;
      case "companies":
        type = "company";
        break;
      case "commodities":
        type = "commodity";
        break;
      case "suppliers":
        type = "supplier";
        break;
      default:
        break;
    }

    if (type !== null) {
      this.$store.dispatch("getOrdersHistory", {
        id: this.$route.params.id,
        type: type,
      });
    }
  },
});
</script>

<style lang="scss">
.orders-history {
  background-color: white;
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 3;
  grid-row-end: 5;
  padding: 0.4rem;
  &__title {
    @include item-detail-header;
  }
  &__info {
    margin: 0.4rem 0;
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr;
    div {
      text-align: center;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
  &__element {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr;
    margin-bottom: 1.5rem;
    div {
      text-align: center;
    }
  }
  &__message {
    font-size: 1.4rem;
    font-weight: 700;
    text-align: center;
    margin-top: 2rem;
  }
}
</style>
