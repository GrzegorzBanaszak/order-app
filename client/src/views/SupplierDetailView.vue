<template>
  <supplier-detail-info />
  <supplier-detail-best-commodities />
  <detail-orders-history-list />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DetailOrdersHistoryList from "@/components/DetailOrdersHistoryList.vue";
import SupplierDetailInfo from "@/components/SupplierDetailInfo.vue";
import SupplierDetailBestCommodities from "@/components/SupplierDetailBestCommodities.vue";

export default defineComponent({
  components: {
    DetailOrdersHistoryList,
    SupplierDetailInfo,
    SupplierDetailBestCommodities,
  },
  mounted() {
    this.$store.dispatch("getSupplierDetail", this.$route.params.id);
  },
  unmounted() {
    this.$store.commit("resetSupplierDetail");
  },
});
</script>

<style lang="scss">
.detail-supplier {
  &__info {
    grid-column-start: 1;
    grid-column-end: 3;
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
  &__popular {
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 3;
    background-color: white;
    padding: 1rem;
    overflow-y: hidden;
    h1 {
      @include item-detail-header;
    }
    p {
      @include item-detail-element;
    }
  }
}
</style>
