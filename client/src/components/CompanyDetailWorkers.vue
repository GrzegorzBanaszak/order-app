<template>
  <div class="detail-company__workers">
    <h1>Pracownicy <customers-blue-icon /></h1>
    <div
      v-if="
        $store.state.companiesState.companyDetail &&
        $store.state.companiesState.companyDetail?.workers.length > 0
      "
      class="workers"
    >
      <div class="workers__header">
        <div>Imie i nazwisko</div>
        <div>Numer telefonu</div>
        <div>Detale</div>
      </div>
      <div
        v-for="item in $store.state.companiesState.companyDetail?.workers"
        class="workers__element"
      >
        <company-detail-worker :worker-data="item"></company-detail-worker>
      </div>
    </div>
    <div v-else class="workers__info">Brak pracowników</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomersBlueIcon from "@/icons/CustomersBlueIcon.vue";
import CompanyDetailWorker from "@/components/CompanyDetailWorker.vue";

export default defineComponent({
  components: { CustomersBlueIcon, CompanyDetailWorker },
});
</script>

<style lang="scss">
.workers {
  overflow-y: auto;
  height: 100%;
  &__header {
    margin: 0.7rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    div {
      text-align: center;
      font-weight: 500;
    }
  }

  &__element {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 1.5rem;
    div {
      text-align: center;
    }
  }

  &__info {
    font-size: 1.4rem;
    font-weight: 700;
    text-align: center;
    margin-top: 1rem;
  }
}
</style>
