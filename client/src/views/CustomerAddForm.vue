<template>
  <form class="add-form">
    <h2 class="add-form__header">Dodaj nowego klienta</h2>
    <div class="add-form__body">
      <form-group
        v-model="firstName"
        label-value="Imię"
        type-value="text"
        placeholder-value="Podaj imię"
        name-value="firstName"
      ></form-group>
      <form-group
        v-model="lastName"
        label-value="Nazwisko"
        type-value="text"
        placeholder-value="Podaj nazwisko"
        name-value="lastName"
      ></form-group>
      <form-group
        v-model="phoneNumber"
        label-value="Numer telefonu"
        type-value="text"
        placeholder-value="Podaj numer telefonu"
        name-value="phoneNumber"
      ></form-group>
      <form-group-dropdown
        v-model="search"
        :search-value="search"
        label-value="Firma"
        type-value="text"
        placeholder-value="Wpisz nazwę"
        name-value="company"
        :listDropdown="$store.getters.getFiltred(search)"
        @selected="elementClick"
        @reset="isCorrectSelected"
      ></form-group-dropdown>

      <button class="add-form__button" type="submit">Dodaj</button>
    </div>
  </form>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent } from "vue";
import FormGroup from "@/components/FormGroup.vue";
import FormGroupDropdown from "@/components/FormGroupDropdown.vue";

export default defineComponent({
  components: { FormGroup, FormGroupDropdown },
  setup() {
    const store = useStore();
    store.dispatch("getSuppliers");
  },
  data() {
    return {
      firstName: "",
      lastName: "",
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
  },
});
</script>

<style lang="scss">
.add-form {
  background-color: white;
  @include display-info-list;
  &__header {
    text-align: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;
    font-size: 1.8rem;
  }
  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__button {
    width: 17.188rem;
    display: block;
    margin: 1rem auto;
    overflow: hidden;
    cursor: pointer;
    padding: 0.7rem 0;
    text-transform: uppercase;
    border: none;
    border-radius: 20px;
    background-color: #3f51b5;
    color: white;
    font-weight: 700;
    font-size: 1.1rem;
  }
}

.form-select {
  position: relative;
  &__container {
    @include scrollbars(5px, #ccc, white);
    position: absolute;
    top: 5.313rem;
    max-height: 120px;
    width: 17.188rem;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    background-color: white;
    overflow: auto;
    border-radius: 0 0 10px 10px;
  }
  &__element {
    padding: 0.5rem 0.2rem;
    cursor: pointer;

    &:hover {
      background-color: #fafafa;
    }
  }
}
</style>
