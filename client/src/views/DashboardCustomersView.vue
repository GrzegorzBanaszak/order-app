<template>
  <div class="customers-list">
    <header class="customers-list__header">Lista Klientów</header>
    <div class="customers-list__info">
      <div>Imie i nazwisko</div>
      <div>Firma</div>
      <div>Ostatnie zamówienie</div>
      <div>Numer telefonu</div>
      <div>Detale</div>
    </div>
    <div
      v-if="$store.state.customersState"
      v-for="item in $store.state.customersState.customers"
      class="customers-list__element"
    >
      <customers-list-element :customer-info="item"></customers-list-element>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import CustomersListElement from "@/components/CustomersListElement.vue";

export default defineComponent({
  components: { CustomersListElement },
  setup() {
    const store = useStore();
    store.dispatch("getCustomers");
  },
});
</script>

<style lang="scss">
.customers-list {
  padding: 1rem;
  background-color: white;
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  grid-row-end: 5;
  overflow-y: scroll;
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
