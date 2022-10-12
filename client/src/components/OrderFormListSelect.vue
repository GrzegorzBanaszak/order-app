<template>
  <div class="form-list__selected">
    <input :type="typeValue" autocomplete="off" />
    <div class="form-list__dropdown">Test</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    typeValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateValue(e: Event) {
      this.$emit("reset");
      this.$emit("update:modelValue", (e.target as HTMLInputElement).value);
    },
  },
});
</script>
