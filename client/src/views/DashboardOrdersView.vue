<template>
  <div class="orders-list">
    <header class="orders-list__header">Lista Zamówień <search-filter-input v-model="filterValue"/></header>
    <div class="orders-list__info">
      <div>Numer zamówienia</div>
      <div>Zamawiający</div>
      <div>Data</div>
      <div>Kwota</div>
      <div>Zaliczka</div>
      <div>Status</div>
      <div>Detale</div>
    </div>
    <div class="orders-list__container">
      <div
        v-if="$store.state.ordersState.ordersInfo"
        v-for="item in $store.getters.getFiltredOrders(filterValue)"
        :key="item.id"
        class="orders-list__element"
      >
        <order-list-element :order-info="item"></order-list-element>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import OrderListElement from "../components/OrderListElement.vue";
import SearchFilterInput from "@/components/SearchFilterInput.vue";

export default defineComponent({
  components: { OrderListElement ,SearchFilterInput},
  setup() {
    const store = useStore();
    store.dispatch("getOrdersInfo");
  },
  data(){
    return{
      filterValue:'' as string
    }
  }
});
</script>

<style lang="scss">
.orders-list {
  @include display-info-list;
  &__header {
    @include display-info-header;
  }
  @include dashboard-list(2fr 3fr 1fr 1fr 1fr 2fr 1fr);
}
</style>
