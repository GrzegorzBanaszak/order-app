<template>
  <form class="add-form" @submit="submitForm">
    <h2 class="add-form__header">Edytuj klienta</h2>
    <div class="add-form__body">
      <form-group
        v-model="name"
        label-value="Imie i nazwisko"
        type-value="text"
        placeholder-value="Podaj nazwę"
        name-value="name"
        :default-value="name"
      ></form-group>
      <form-group
        v-model="phoneNumber"
        label-value="Numer telefonu"
        type-value="number"
        placeholder-value="Podaj numer telefonu"
        name-value="phoneNumber"
        :default-value="phoneNumber"
      >
      </form-group>
      <form-group-dropdown
        v-model="search"
        :search-value="search"
        label-value="Firma"
        type-value="text"
        placeholder-value="Wpisz nazwę"
        name-value="company"
        :default-value="companyName"
        :listDropdown="$store.getters.getFiltredCompanies(search)"
        @selected="elementClick"
        @reset="isCorrectSelected"
      ></form-group-dropdown>
      <button class="add-form__button" type="submit">Dodaj</button>
    </div>
  </form>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import FormGroup from "@/components/FormGroup.vue";
import FormGroupDropdown from "@/components/FormGroupDropdown.vue";
import { ICustomerEditData, ICustomerPost } from "@/types";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { FormGroup, FormGroupDropdown },
  setup() {
    const store = useStore();
    const route = useRoute();
    store.dispatch("getCompanies");

    const customerId = ref<string>("");
    const name = ref<string>("");
    const phoneNumber = ref<string>("");
    const companyId = ref<string>("");
    const companyName = ref<string>("");

    store.dispatch("getCustomerDetail", route.params.id).then(() => {
      if (store.state.customersState.customerDetail) {
        customerId.value = store.state.customersState.customerDetail.id;
        name.value = store.state.customersState.customerDetail.name;
        phoneNumber.value =
          store.state.customersState.customerDetail.phoneNumber;
        if (store.state.customersState.customerDetail.company) {
          companyId.value =
            store.state.customersState.customerDetail.company.id;
          companyName.value =
            store.state.customersState.customerDetail.company.name;
        }
      }
    });
    const search = ref<string>("");

    return {
      name,
      phoneNumber,
      search,
      companyId,
      companyName,
      customerId,
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

      const updatedData: ICustomerPost = {
        name: this.name,
        phoneNumber: this.phoneNumber,
        company: this.companyId !== "" ? this.companyId : null,
      };

      const dataToUpdate: ICustomerEditData = {
        id: this.customerId,
        data: updatedData,
      };

      await this.$store.dispatch("editCustomer", dataToUpdate);

      if (!this.$store.state.customersState.isError) {
        this.$router.replace({ replace: true, path: "/d/customers" });
      } else {
        this.$store.commit("toggleCustomerError");
      }
    },
  },
});
</script>
