<template>
  <company-detail-info></company-detail-info>
  <company-detail-workers></company-detail-workers>
  <detail-orders-history-list></detail-orders-history-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DetailOrdersHistoryList from "@/components/DetailOrdersHistoryList.vue";
import CompanyDetailInfo from "@/components/CompanyDetailInfo.vue";
import CompanyDetailWorkers from "@/components/CompanyDetailWorkers.vue";

export default defineComponent({
  components: {
    DetailOrdersHistoryList,
    CompanyDetailInfo,
    CompanyDetailWorkers,
  },
  mounted() {
    this.$store.dispatch("getCompanyDetail", this.$route.params.id);
  },
});
</script>

<style lang="scss">
.detail-company {
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
  &__workers {
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
