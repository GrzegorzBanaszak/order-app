<template>
  <div>{{ supplierItem.name }}</div>
  <div>
    <router-link :to="'/d/suppliers/' + supplierItem.id"
      ><dotts-icon
    /></router-link>
  </div>
</template>

<script lang="ts">
import { CommodityDetailSupplier } from "@/types";
import { defineComponent, PropType } from "vue";
import DottsIcon from "@/icons/DottsIcon.vue";

export default defineComponent({
  props: {
    supplierItem: {
      type: Object as PropType<CommodityDetailSupplier>,
      required: true,
    },
  },
  components: { DottsIcon },
});
</script>
