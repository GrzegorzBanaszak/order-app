<template>
  <customer-detail-info></customer-detail-info>
  <customer-detail-supplier></customer-detail-supplier>
  <detail-orders-history-list></detail-orders-history-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomerDetailInfo from "../components/CustomerDetailInfo.vue";
import CustomerDetailSupplier from "@/components/CustomerDetailSupplier.vue";
import DetailOrdersHistoryList from "@/components/DetailOrdersHistoryList.vue";

export default defineComponent({
  components: {
    CustomerDetailInfo,
    CustomerDetailSupplier,
    DetailOrdersHistoryList,
  },
  mounted() {
    this.$store.dispatch("getCustomerDetail", this.$route.params.id);
  },
  unmounted() {
    this.$store.commit("resetCustomerDetail");
  },
});
</script>

<style lang="scss">
.detail-customer {
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
  &__supplier {
    grid-column-start: 3;
    grid-column-end: 5;
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
}
</style>
