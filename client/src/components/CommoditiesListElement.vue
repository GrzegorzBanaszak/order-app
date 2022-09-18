<template>
  <div>{{ commodityInfo.name }}</div>
  <div>{{ commodityInfo.lastPrice }}</div>
  <div>
    {{ getDate() }}
  </div>
  <div><dotts-icon /></div>
</template>

<script lang="ts">
import DottsIcon from "@/icons/DottsIcon.vue";
import { ICommodityInfo } from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: { DottsIcon },
  props: {
    commodityInfo: {
      type: Object as PropType<ICommodityInfo>,
      required: true,
    },
  },
  methods: {
    getDate(): string {
      if (this.commodityInfo.lastOrder) {
        return moment(this.commodityInfo.lastOrder).format("DD/MM/YYYY");
      } else {
        return "Brak";
      }
    },
  },
});
</script>

<style></style>
