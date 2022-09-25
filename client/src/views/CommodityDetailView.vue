<template>
  <commodity-detail-info />
  <commodity-detail-suppliers />
  <detail-orders-history-list />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DetailOrdersHistoryList from "@/components/DetailOrdersHistoryList.vue";
import CommodityDetailInfo from "@/components/CommodityDetailInfo.vue";
import CommodityDetailSuppliers from "@/components/CommodityDetailSuppliers.vue";

export default defineComponent({
  components: {
    DetailOrdersHistoryList,
    CommodityDetailInfo,
    CommodityDetailSuppliers,
  },
  mounted() {
    this.$store.dispatch("getCommodityDetail", this.$route.params.id);
  },
});
</script>

<style lang="scss">
.detail-commodity {
  &__info {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
    background-color: white;
    padding: 1rem;
    h1 {
      @include item-detail-header;
    }
    p {
      @include item-detail-element;
    }
  }
  &__suppliers {
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 3;
    background-color: white;
    padding: 1rem;
    h1 {
      @include item-detail-header;
    }
  }
}
</style>
