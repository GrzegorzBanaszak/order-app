<template>Companies</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch("getCompanies");
  },
});
</script>

<style></style>
