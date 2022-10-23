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
    <div v-if="$store.state.customersState" v-for="item in $store.state.customersState.customers" :key="item.id"
      class="customers-list__element">
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
  @include display-info-list;

  &__header {
    @include display-info-header;
  }

  @include dashboard-list(2fr 2fr 2fr 1fr 1fr);
}

.list-element__controller {
  display: flex;
  gap: 0.5rem;
  justify-content: center;

  svg {
    cursor: pointer;
  }
}
</style>
