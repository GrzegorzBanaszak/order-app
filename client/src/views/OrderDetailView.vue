<template>
  <order-detail-info></order-detail-info>
  <order-detail-customer></order-detail-customer>
  <order-detail-supplier></order-detail-supplier>
  <order-detail-commodities></order-detail-commodities>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderDetailInfo from "@/components/OrderDetailInfo.vue";
import OrderDetailSupplier from "@/components/OrderDetailSupplier.vue";
import OrderDetailCustomer from "@/components/OrderDetailCustomer.vue";
import OrderDetailCommodities from "@/components/OrderDetailCommodities.vue";
export default defineComponent({
  components: {
    OrderDetailInfo,
    OrderDetailSupplier,
    OrderDetailCustomer,
    OrderDetailCommodities,
  },
  mounted() {
    this.$store.dispatch("getOrderDetail", this.$route.params.id);
  },
});
</script>

<style lang="scss">
.detail-order {
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
    @include order-detail-element(2, 3, 3, 5);
  }
  &__customer {
    @include order-detail-element(1, 2, 3, 5);
  }
  &__commodities {
    grid-column-start: 1;
    grid-column-end: 5;
    grid-row-start: 3;
    grid-row-end: 5;
    background-color: white;
    padding: 1rem;
    overflow-y: auto;
    h1 {
      @include item-detail-header;
    }
    &--header {
      display: grid;
      grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
      font-weight: 500;
      margin: 0.7rem 0;
      padding-bottom: 1rem;
      border-bottom: 1px solid #ccc;
      div {
        text-align: center;
      }
    }
    &--element {
      margin: 0.7rem 0;
      padding: 0.5rem 0;
      border-bottom: 1px solid #ccc;
      display: grid;
      grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
      div {
        text-align: center;
      }
    }
  }
}
</style>
