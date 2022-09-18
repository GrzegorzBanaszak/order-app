<template>
  <div>
    {{ $route.params.id }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  mounted() {
    this.$store.dispatch("getCustomerDetail", this.$route.params.id);
  },
});
</script>

<style></style>
