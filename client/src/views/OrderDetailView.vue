<template>
  <order-detail-info></order-detail-info>
  <order-detail-customer></order-detail-customer>
  <order-detail-status></order-detail-status>
  <order-detail-commodities></order-detail-commodities>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderDetailInfo from "@/components/OrderDetailInfo.vue";
import OrderDetailSupplier from "@/components/OrderDetailSupplier.vue";
import OrderDetailCustomer from "@/components/OrderDetailCustomer.vue";
import OrderDetailCommodities from "@/components/OrderDetailCommodities.vue";
import OrderDetailStatus from "@/components/OrderDetailStatus.vue";

export default defineComponent({
  components: {
    OrderDetailInfo,
    OrderDetailSupplier,
    OrderDetailCustomer,
    OrderDetailCommodities,
    OrderDetailStatus,
  },
  mounted() {
    this.$store.dispatch("getOrderDetail", this.$route.params.id);
  },
  unmounted() {
    this.$store.commit("resetOrderDetail");
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
    padding: 0.5rem;
    position: relative;
    h1 {
      @include item-detail-header;
    }
    p {
      @include item-detail-element;
    }
  }

  &__status {
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 3;
    background-color: white;
    padding: 0.5rem;
    position: relative;
    h1 {
      @include item-detail-header;
    }
    p {
      padding-top: 1rem;
      font-size: 1.3rem;
      display: flex;
      justify-content: center;
    }
  }
  &__edit {
    position: absolute;
    right: 0.5rem;
    display: flex;
    gap: 0.4rem;
    svg {
      cursor: pointer;
    }
  }

  &__select {
    border-bottom: 2px solid #ccc;
    margin-left: 0.4rem;
    width: 180px;
    text-align: center;
    cursor: pointer;
    position: relative;
    user-select: none;
    &--dropdown {
      width: 100%;
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      background-color: white;
      top: 25px;
      border: 1px solid #ccc;
    }
    span {
      &:hover {
        background-color: #e8e8e8;
      }
    }
  }
  &__information {
    display: flex;
    gap: 2rem;
    p {
      display: flex;
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
      grid-template-columns: 30% 25% 20% 5% 10% 5% 5%;
      font-weight: 500;
      margin: 0.5rem 0;
      padding-bottom: 0.5rem;
      font-size: 0.9rem;
      div {
        text-align: center;
      }
    }
    &--element {
      margin: 0.5rem 0;
      padding: 0.5rem 0;
      font-size: 0.9rem;
      border-bottom: 1px solid #ccc;
      display: grid;
      grid-template-columns: 30% 25% 20% 5% 10% 5% 5%;
      div {
        text-align: center;
      }
    }
  }
}
</style>
