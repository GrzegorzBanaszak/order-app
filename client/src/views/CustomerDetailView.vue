<template>
  <customer-detail-info></customer-detail-info>
  <customer-detail-supplier></customer-detail-supplier>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomerDetailInfo from "../components/CustomerDetailInfo.vue";
import CustomerDetailSupplier from "@/components/CustomerDetailSupplier.vue";

export default defineComponent({
  components: { CustomerDetailInfo, CustomerDetailSupplier },
  mounted() {
    this.$store.dispatch("getCustomerDetail", this.$route.params.id);
  },
});
</script>

<style lang="scss">
.detail-customer {
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
  &__supplier {
    grid-column-start: 4;
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
