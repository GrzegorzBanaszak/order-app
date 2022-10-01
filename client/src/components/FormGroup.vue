<template>
  <div class="form-group">
    <label :for="nameValue">{{ labelValue }}</label>
    <input
      @input="updateValue"
      :type="typeValue"
      :placeholder="placeholderValue"
      :name="nameValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    placeholderValue: {
      type: String,
      required: true,
    },
    typeValue: {
      type: String,
      required: true,
    },
    labelValue: {
      type: String,
      required: true,
    },
    nameValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateValue(e: Event) {
      this.$emit("update:modelValue", (e.target as HTMLInputElement).value);
    },
  },
});
</script>

<style lang="scss">
.form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  label {
    margin-bottom: 1rem;
    font-size: 1.6rem;
  }
  input {
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 17.188rem;
    &:focus {
      outline: none;
    }
  }
}
</style>
