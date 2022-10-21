<template>
  <div class="detail-order__commodities">
    <h1>Lista towarów <package-blue-icon /></h1>
    <div class="detail-order__commodities--header">
      <div>Nazwa</div>
      <div>Dostawca</div>
      <div>Opis</div>
      <div>Ilość</div>
      <div>Cena brutto</div>
      <div>Detale</div>
    </div>
    <order-detail-commodity
      v-if="$store.state.ordersState.orderDetail"
      v-for="item in $store.state.ordersState.orderDetail.commodities"
      :key="item.id"
      :commodity-item="item"
    ></order-detail-commodity>
  </div>
</template>

<script lang="ts">
import PackageBlueIcon from "@/icons/PackageBlueIcon.vue";
import OrderDetailCommodity from "./OrderDetailCommodity.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { PackageBlueIcon, OrderDetailCommodity },
});
</script>
