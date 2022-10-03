<template>
  <form class="add-form" @submit="submitForm">
    <h2 class="add-form__header">Dodaj nowego dostawcę</h2>
    <div class="add-form__body">
      <form-group
        v-model="name"
        label-value="Nazwa dostawcy"
        type-value="text"
        placeholder-value="Podaj nazwę dostawcy"
        name-value="name"
      ></form-group>
      <form-group
        v-model="price"
        label-value="Cena dostawy"
        type-value="number"
        placeholder-value="Podaj cene"
        name-value="price"
      ></form-group>
      <button class="add-form__button" type="submit">Dodaj</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormGroup from "@/components/FormGroup.vue";
import { ISupplierPost } from "@/types";

export default defineComponent({
  components: { FormGroup },
  data() {
    return {
      name: "",
      price: "",
    };
  },
  methods: {
    async submitForm(e: Event) {
      e.preventDefault();

      const data: ISupplierPost = {
        name: this.name,
        price: Number(this.price),
      };

      await this.$store.dispatch("addSupplier", data);

      if (!this.$store.state.suppliersState.isError) {
        this.$router.replace({ replace: true, path: "/d/suppliers" });
      } else {
        this.$store.commit("toggleSupplierError");
      }
    },
  },
});
</script>
