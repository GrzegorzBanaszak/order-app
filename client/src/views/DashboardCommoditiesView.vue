<template>
  <div class="commodities-list">
    <header class="commodities-list__header">Lista Towarów <search-filter-input v-model="filterValue"/></header>
    <div class="commodities-list__info">
      <div>Nazwa towaru</div>
      <div>Ostatnia cena</div>
      <div>Ostatnie sprzedaż</div>
      <div>Detale</div>
    </div>
    <div class="commodities-list__container">
      <div
        v-if="$store.state.commoditiesState.commodities"
        v-for="item in $store.getters.getFiltredCommodities(filterValue)"
        :key="item.id"
        class="commodities-list__element"
      >
        <commodities-list-element
          :commodity-info="item"
        ></commodities-list-element>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import CommoditiesListElement from "../components/CommoditiesListElement.vue";
import SearchFilterInput from "@/components/SearchFilterInput.vue";

export default defineComponent({
  components: { CommoditiesListElement,SearchFilterInput },
  setup() {
    const store = useStore();
    store.dispatch("setCommodities");
  },
  data(){
    return{
      filterValue:'' as string
    }
  }
});
</script>

<style lang="scss">
.commodities-list {
  @include display-info-list;
  &__header {
    @include display-info-header;
  }
  @include dashboard-list(2fr 2fr 1fr 1fr);
}
</style>
