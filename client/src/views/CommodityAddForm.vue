<template>
  <form class="add-form" @submit="submitForm">
    <h2 class="add-form__header">Dodaj nową firmę</h2>
    <div class="add-form__body">
      <form-group
        v-model="name"
        label-value="Nazwa towaru"
        type-value="text"
        placeholder-value="Podaj nazwę towaru"
        name-value="name"
      ></form-group>
      <form-group
        v-model="indexNumber"
        label-value="Numer katalogowy"
        type-value="text"
        placeholder-value="Numer nie wymagany"
        name-value="indexNumber"
      ></form-group>
      <form-group-textarea
        v-model="description"
        label-value="Opis"
        type-value="text"
        placeholder-value="Dodatkowy opis"
        name-value="description"
      >
      </form-group-textarea>
      <button class="add-form__button" type="submit">Dodaj</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormGroup from "@/components/FormGroup.vue";
import FormGroupTextarea from "@/components/FormGroupTextarea.vue";
import { ICommodityPost } from "@/types";

export default defineComponent({
  components: { FormGroup, FormGroupTextarea },
  data() {
    return {
      name: "",
      indexNumber: "",
      description: "",
    };
  },
  methods: {
    async submitForm(e: Event) {
      e.preventDefault();

      const data: ICommodityPost = {
        name: this.name,
        indexNumber: this.indexNumber,
        description: this.description,
      };

      await this.$store.dispatch("addCommodity", data);

      if (!this.$store.state.commoditiesState.isError) {
        this.$router.replace({ replace: true, path: "/d/commodities" });
      } else {
        this.$store.commit("toggleCommodityError");
      }
    },
  },
});
</script>
