<template>
  <form class="form-order" @submit="submitForm">
    <h2 class="add-form__header">Dodaj nowe zamówienie</h2>
    <div class="form-order__header">
      <form-group
        v-model="advance"
        label-value="Zaliczka"
        type-value="number"
        placeholder-value="Wpisz zaliczkę"
        name-value="advance"
      ></form-group>
      <form-group-dropdown
        v-model="searchCustomer"
        :search-value="searchCustomer"
        label-value="Klient"
        type-value="text"
        placeholder-value="Wpisz nazwę klienta"
        name-value="company"
        :listDropdown="$store.getters.getFiltredCustomer(searchCustomer)"
        @selected="selectCustomer"
        @reset="isCustomerSelected"
      ></form-group-dropdown>
      <form-group-select
        label-value="Status"
        :list-dropdown="['W przygotowaniu', 'Wysłano', 'Do odbioru']"
        @selected="(item:string) => (status = item)"
      ></form-group-select>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormGroup from "@/components/FormGroup.vue";
import FormGroupDropdown from "@/components/FormGroupDropdown.vue";
import FormGroupSelect from "@/components/FormGroupSelect.vue";

export default defineComponent({
  components: { FormGroup, FormGroupDropdown, FormGroupSelect },
  mounted() {
    this.$store.dispatch("getCustomers");
  },
  data() {
    return {
      advance: 0,
      searchCustomer: "",
      customerId: "",
      status: "",
    };
  },
  methods: {
    selectCustomer(id: string) {
      this.searchCustomer = "";
      this.customerId = id;
    },
    isCustomerSelected() {
      if (this.customerId !== "") {
        this.customerId = "";
      }
    },
    async submitForm(e: Event) {
      e.preventDefault();
    },
  },
});
</script>
