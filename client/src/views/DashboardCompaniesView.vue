<template>
  <div class="companies-list">
    <header class="companies-list__header">Lista Firm <search-filter-input v-model="filterValue"/></header>
    <div class="companies-list__info">
      <div>Nazwa firmy</div>
      <div>Nip</div>
      <div>Ostatnie zamówienie</div>
      <div>Ilość pracowników</div>
      <div>Detale</div>
    </div>
    <div class="companies-list__container">
      <div
        v-if="$store.state.companiesState.companies"
        v-for="item in $store.getters.getFiltredCompanies(filterValue)"
        :key="item.id"
        class="companies-list__element"
      >
        <companies-list-element :company-info="item"></companies-list-element>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CompaniesListElement from "@/components/CompaniesListElement.vue";
import SearchFilterInput from "@/components/SearchFilterInput.vue";
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  components: { CompaniesListElement ,SearchFilterInput},
  setup() {
    const store = useStore();
    store.dispatch("getCompanies");
  },
  data(){
    return{
      filterValue:'' as string
    }
  }
});
</script>

<style lang="scss">
.companies-list {
  @include display-info-list;
  &__header {
    @include display-info-header;
  }
  @include dashboard-list(2fr 2fr 2fr 1fr 1fr);
}
</style>
