<template>
  <div class="companies-list">
    <header class="companies-list__header">Lista Firm</header>
    <div class="companies-list__info">
      <div>Nazwa firmy</div>
      <div>Nip</div>
      <div>Ostatnie zamówienie</div>
      <div>Ilość pracowników</div>
      <div>Detale</div>
    </div>
    <div
      v-if="$store.state.companiesState?.companies"
      v-for="item in $store.state.companiesState?.companies"
      class="companies-list__element"
    >
      <companies-list-element
        :key="item.id"
        :company-info="item"
      ></companies-list-element>
    </div>
  </div>
</template>

<script lang="ts">
import CompaniesListElement from "@/components/CompaniesListElement.vue";
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  components: { CompaniesListElement },
  setup() {
    const store = useStore();
    store.dispatch("getCompanies");
  },
});
</script>

<style lang="scss">
.companies-list {
  @include display-info-list;
  &__header {
    display: flex;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 700;
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
