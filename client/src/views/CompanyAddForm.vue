<template>
  <form class="add-form" @submit="submitForm">
    <h2 class="add-form__header">Dodaj nową firmę</h2>
    <div class="add-form__body">
      <form-group
        v-model="name"
        label-value="Nazwa firmy"
        type-value="text"
        placeholder-value="Podaj nazwę"
        name-value="name"
      ></form-group>
      <form-group
        v-model="nip"
        label-value="Nip"
        type-value="text"
        placeholder-value="Podaj nip"
        name-value="nip"
      ></form-group>
      <button class="add-form__button" type="submit">Dodaj</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormGroup from "@/components/FormGroup.vue";
import { ICompanyPost } from "@/types";

export default defineComponent({
  components: { FormGroup },
  data() {
    return {
      name: "",
      nip: "",
    };
  },
  methods: {
    async submitForm(e: Event) {
      e.preventDefault();
      const data: ICompanyPost = {
        name: this.name,
        nip: this.nip,
      };

      await this.$store.dispatch("addCompany", data);

      if (!this.$store.state.companiesState.isError) {
        this.$router.replace({ replace: true, path: "/d/companies" });
      } else {
        this.$store.commit("toggleCompanyError");
      }
    },
  },
});
</script>

<style></style>
