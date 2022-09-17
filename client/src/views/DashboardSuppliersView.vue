<template>
  <div class="suppliers-list">
    <header class="suppliers-list__header">Lista Dostawców</header>
    <div class="suppliers-list__info">
      <div>Nazwa dostawcy</div>
      <div>Cena dostawy</div>
      <div>Ostatnie zamówienie</div>
      <div>Ilość zamówień</div>
      <div>Detale</div>
    </div>
    <div
      v-if="$store.state.suppliersState.suppliers"
      v-for="item in $store.state.suppliersState.suppliers"
      :id="item.id"
      class="suppliers-list__element"
    >
      <suppliers-list-element :supplier-info="item"></suppliers-list-element>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import SuppliersListElement from "@/components/SuppliersListElement.vue";
export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch("getSuppliers");
  },
  components: { SuppliersListElement },
});
</script>

<style lang="scss">
.suppliers-list {
  @include display-info-list;
  &__header {
    @include display-info-header;
  }
  &__info {
    margin: 1.4rem 0;
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 1fr 1fr;
    div {
      text-align: center;
    }
  }
  &__element {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 1fr 1fr;
    margin-bottom: 1.5rem;
    div {
      text-align: center;
    }
  }
}
</style>
