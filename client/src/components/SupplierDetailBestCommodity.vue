<template>
  <div>{{ commodityData.name }}</div>
  <div>{{ commodityData.quantity }}</div>
  <div>{{ commodityData.price }} zł</div>
  <div>
    <router-link :to="'/d/commodities/' + commodityData.id"
      ><info-black-icon
    /></router-link>
  </div>
</template>

<script lang="ts">
import { BestOrderCommodity } from "@/types";
import { defineComponent, PropType } from "vue";
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";

export default defineComponent({
  components: { InfoBlackIcon },
  props: {
    commodityData: {
      type: Object as PropType<BestOrderCommodity>,
      required: true,
    },
  },
});
</script>
