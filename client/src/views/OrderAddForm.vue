<template>
    <form class="add-form" @submit="submitForm">
        <h2 class="add-form__header">Dodaj nowe zamówienie</h2>
    </form>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import FormGroup from "@/components/FormGroup.vue";

  
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

      },
    },
  });
  </script>
  