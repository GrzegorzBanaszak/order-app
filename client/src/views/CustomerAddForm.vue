<template>
  <form class="add-form" @submit="submitForm">
    <h2 class="add-form__header">Dodaj nowego klienta</h2>
    <div class="add-form__body">
      <form-group v-model="name" label-value="Imie i nazwisko" type-value="text" placeholder-value="Podaj nazwę"
        name-value="name"></form-group>
      <form-group v-model="phoneNumber" label-value="Numer telefonu" type-value="text"
        placeholder-value="Podaj numer telefonu" name-value="phoneNumber"></form-group>
      <form-group-dropdown v-model="search" :search-value="search" label-value="Firma" type-value="text"
        placeholder-value="Wpisz nazwę" name-value="company" :listDropdown="$store.getters.getFiltredCompanies(search)"
        @selected="elementClick" @reset="isCorrectSelected"></form-group-dropdown>
      <button class="add-form__button" type="submit">Dodaj</button>
    </div>
  </form>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import FormGroup from "@/components/FormGroup.vue";
import FormGroupDropdown from "@/components/FormGroupDropdown.vue";
import { ICustomerPost } from "@/types";

export default defineComponent({
  components: { FormGroup, FormGroupDropdown },
  setup() {
    const store = useStore();
    store.dispatch("getCompanies");
  },
  data() {
    return {
      name: "",
      phoneNumber: "",
      search: "",
      companyId: "",
    };
  },
  methods: {
    elementClick(id: string) {
      this.search = "";
      this.companyId = id;
    },
    isCorrectSelected() {
      if (this.companyId !== "") {
        this.companyId = "";
      }
    },
    async submitForm(e: Event) {
      e.preventDefault();


      let data: ICustomerPost = {
        name: this.name,
        phoneNumber: this.phoneNumber,
        company: this.companyId !== "" ? this.companyId : null,
      };

      await this.$store.dispatch("addCustomer", data);

      if (!this.$store.state.customersState.isError) {
        this.$router.replace({ replace: true, path: "/d/customers" });
      } else {
        this.$store.commit("toggleCustomerError");
      }

    },
  },
});
</script>
