<template>
  <div>{{ supplierInfo.name }}</div>
  <div>{{ supplierInfo.price }}</div>
  <div>
    {{ getDate() }}
  </div>
  <div>{{ supplierInfo.numberOfOrders }}</div>
  <div><dotts-icon /></div>
</template>

<script lang="ts">
import DottsIcon from "@/icons/DottsIcon.vue";
import { ISupplierInfo } from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: { DottsIcon },
  props: {
    supplierInfo: {
      type: Object as PropType<ISupplierInfo>,
      required: true,
    },
  },
  methods: {
    getDate(): string {
      if (this.supplierInfo.lastOrder) {
        return moment(this.supplierInfo.lastOrder).format("DD/MM/YYYY");
      } else {
        return "Brak";
      }
    },
  },
});
</script>

<style></style>
