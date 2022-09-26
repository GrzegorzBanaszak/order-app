<template>
  <div class="detail-order__supplier">
    <h1>Dostawca <supplier-blue-icon /></h1>
    <div class="detail-order__supplier--header">
      <div>Nazwa</div>
      <div>Cena dostawy</div>
      <div>Delate</div>
    </div>
    <div class="detail-order__supplier--info">
      <div>{{ $store.state.ordersState.orderDetail?.supplier.name }}</div>
      <div>{{ $store.state.ordersState.orderDetail?.supplier.price }} zł</div>
      <div>
        <router-link
          :to="
            '/d/suppliers/' + $store.state.ordersState.orderDetail?.supplier.id
          "
          ><dotts-icon
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SupplierBlueIcon from "@/icons/SupplierBlueIcon.vue";
import DottsIcon from "@/icons/DottsIcon.vue";
export default defineComponent({ components: { SupplierBlueIcon, DottsIcon } });
</script>
