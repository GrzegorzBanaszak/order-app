<template>
  <div>{{ supplierItem.name }}</div>
  <div>
    <router-link :to="'/d/suppliers/' + supplierItem.id"
      ><info-black-icon
    /></router-link>
  </div>
</template>

<script lang="ts">
import { CommodityDetailSupplier } from "@/types";
import { defineComponent, PropType } from "vue";
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";

export default defineComponent({
  props: {
    supplierItem: {
      type: Object as PropType<CommodityDetailSupplier>,
      required: true,
    },
  },
  components: { InfoBlackIcon },
});
</script>
