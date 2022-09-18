<template>
  <div class="commodities-list">
    <header class="commodities-list__header">Lista Firm</header>
    <div class="commodities-list__info">
      <div>Nazwa towaru</div>
      <div>Ostatnia cena</div>
      <div>Ostatnie sprzedaż</div>
      <div>Detale</div>
    </div>
    <div
      v-if="$store.state.commoditiesState.commodities"
      v-for="item in $store.state.commoditiesState.commodities"
      :key="item.id"
      class="commodities-list__element"
    >
      <commodities-list-element
        :commodity-info="item"
      ></commodities-list-element>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import CommoditiesListElement from "../components/CommoditiesListElement.vue";

export default defineComponent({
  components: { CommoditiesListElement },
  setup() {
    const store = useStore();
    store.dispatch("setCommodities");
  },
});
</script>

<style lang="scss">
.commodities-list {
  @include display-info-list;
  &__header {
    @include display-info-header;
  }
  &__info {
    margin: 1.4rem 0;
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr;
    div {
      text-align: center;
    }
  }
  &__element {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr;
    margin-bottom: 1.5rem;
    div {
      text-align: center;
    }
  }
}
</style>
