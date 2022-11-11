<template>
  <div class="detail-order__commodities--element">
    <div>{{ commodityItem.name }}</div>
    <div>{{ commodityItem.supplierName }}</div>
    <div>{{ commodityItem.deliveryPrice }} zł</div>
    <div>{{ commodityItem.quantity }} szt</div>
    <div>{{ commodityItem.price.toFixed(2) }} zł</div>
    <div>
      <router-link :to="'/d/commodities/' + commodityItem.id"
        ><info-black-icon
      /></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { IOrderDetailCommodity } from "@/types";
import { defineComponent, PropType } from "vue";
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";

export default defineComponent({
  components: { InfoBlackIcon },
  props: {
    commodityItem: {
      type: Object as PropType<IOrderDetailCommodity>,
      required: true,
    },
  },
});
</script>

<style></style>
