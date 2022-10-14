<template>
  <div class="form-list__item">
    <div>{{orderItem.commodityName}}</div>
    <div>{{orderItem.supplierName}}</div>
    <div>{{orderItem.deliveryCost}}</div>
    <div><input type="checkbox" readonly :value="orderItem.isCustomerPayForDelivery" /></div>
    <div>{{orderItem.quantity}}</div>
    <div>{{orderItem.price}}</div>
    <div>{{orderItem.status}}</div>
  </div>
</template>

<script lang="ts">
import { IOrderFormListElement } from "@/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    orderItem: {
      type: Object as PropType<IOrderFormListElement>,
      required: true,
    },
  },
});
</script>
