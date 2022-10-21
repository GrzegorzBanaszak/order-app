<template>
  <div class="detail-order__commodities--element">
    <div>{{ commodityItem.name }}</div>
    <div>{{ commodityItem.supplierName }}</div>
    <div>{{ commodityItem.description }}</div>
    <div>{{ commodityItem.quantity }} szt</div>
    <div>{{ commodityItem.price }}zł</div>
    <div>
      <router-link :to="'/d/commodities/' + commodityItem.id"
        ><dotts-icon
      /></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { IOrderDetailCommodity } from "@/types";
import { defineComponent, PropType } from "vue";
import DottsIcon from "@/icons/DottsIcon.vue";

export default defineComponent({
  components: { DottsIcon },
  props: {
    commodityItem: {
      type: Object as PropType<IOrderDetailCommodity>,
      required: true,
    },
  },
});
</script>

<style></style>
