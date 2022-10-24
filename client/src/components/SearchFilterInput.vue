<template>
  <div class="search-filter">
    <input type="text" @input="updateValue" placeholder="Szukaj..." />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  methods: {
    updateValue(e: Event) {
      this.$emit("update:modelValue", (e.target as HTMLInputElement).value);
    },
  },
});
</script>

<style lang="scss">
    .search-filter{
        input{
            border: none;
            padding: 0.5rem 0.5rem 0.2rem 0.5rem;
            border-bottom: 1px solid #ccc;
            outline: none;
        }
    }
</style>
