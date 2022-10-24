<template>
  <div class="suppliers-list">
    <header class="suppliers-list__header">Lista Dostawców <search-filter-input v-model="filterValue"/></header>
    <div class="suppliers-list__info">
      <div>Nazwa dostawcy</div>
      <div>Cena dostawy</div>
      <div>Ostatnie zamówienie</div>
      <div>Ilość zamówień</div>
      <div>Detale</div>
    </div>
    <div class="suppliers-list__container">
      <div
      v-if="$store.state.suppliersState.suppliers"
      v-for="item in $store.getters.getFiltredSupplier(filterValue)"
      :id="item.id"
      class="suppliers-list__element"
    >
      <suppliers-list-element :supplier-info="item"></suppliers-list-element>
    </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import SuppliersListElement from "@/components/SuppliersListElement.vue";
import SearchFilterInput from "@/components/SearchFilterInput.vue";

export default defineComponent({
  components: { SuppliersListElement ,SearchFilterInput},
  setup() {
    const store = useStore();
    store.dispatch("getSuppliers");
  },
  data(){
    return{
      filterValue:'' as string
    }
  }
});
</script>

<style lang="scss">
.suppliers-list {
  @include display-info-list;
  &__header {
    @include display-info-header;
  }
  @include dashboard-list(2fr 2fr 2fr 1fr 1fr);
}
</style>
