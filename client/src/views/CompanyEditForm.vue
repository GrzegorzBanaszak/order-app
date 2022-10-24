<template>
  <form class="add-form" @submit="submitForm">
    <h2 class="add-form__header">Edytuj firmę</h2>
    <div class="add-form__body">
      <form-group
        v-model="name"
        label-value="Nazwa firmy"
        type-value="text"
        placeholder-value="Podaj nazwę"
        name-value="name"
        :default-value="name"
      ></form-group>
      <form-group
        v-model="nip"
        label-value="Nip"
        type-value="number"
        placeholder-value="Podaj nip"
        name-value="phoneNumber"
        :default-value="nip"
      >
      </form-group>
      <button class="add-form__button" type="submit">Dodaj</button>
    </div>
  </form>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import FormGroup from "@/components/FormGroup.vue";
import FormGroupDropdown from "@/components/FormGroupDropdown.vue";
import { ICompanyEditData, ICompanyPost } from "@/types";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { FormGroup, FormGroupDropdown },
  setup() {
    const store = useStore();
    const route = useRoute();
    store.dispatch("getCompanies");

    const companyId = ref<string>("");
    const name = ref<string>("");
    const nip = ref<string>("");

    store.dispatch("getCompanyDetail", route.params.id).then(() => {
      if (store.state.companiesState.companyDetail) {
        companyId.value = store.state.companiesState.companyDetail.id;
        name.value = store.state.companiesState.companyDetail.name;
        nip.value = store.state.companiesState.companyDetail.nip;
      }
    });

    return {
      name,
      nip,
      companyId,
    };
  },
  methods: {
    async submitForm(e: Event) {
      e.preventDefault();

      const updatedData: ICompanyPost = {
        name: this.name,
        nip: this.nip,
      };

      const dataToUpdate: ICompanyEditData = {
        id: this.companyId,
        data: updatedData,
      };

      await this.$store.dispatch("editCompany", dataToUpdate);

      if (!this.$store.state.customersState.isError) {
        this.$router.replace({ replace: true, path: "/d/companies" });
      } else {
        this.$store.commit("toggleCustomerError");
      }
    },
  },
});
</script>
