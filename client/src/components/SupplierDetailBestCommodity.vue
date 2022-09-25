<template>
  <div>{{ commodityData.name }}</div>
  <div>{{ commodityData.quantity }}</div>
  <div>{{ commodityData.price }} zł</div>
  <div>
    <router-link :to="'/d/commodities/' + commodityData.id"
      ><dotts-icon
    /></router-link>
  </div>
</template>

<script lang="ts">
import { BestOrderCommodity } from "@/types";
import { defineComponent, PropType } from "vue";
import DottsIcon from "@/icons/DottsIcon.vue";

export default defineComponent({
  components: { DottsIcon },
  props: {
    commodityData: {
      type: Object as PropType<BestOrderCommodity>,
      required: true,
    },
  },
});
</script>
