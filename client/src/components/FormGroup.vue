<template>
  <div class="form-group">
    <label :for="nameValue">{{ labelValue }}</label>
    <input ref="input" @input="updateValue" :type="typeValue" :placeholder="placeholderValue" :name="nameValue" step=".01"
      autocomplete="off" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const input = ref<HTMLInputElement | null>(null)

    return {
      input
    }
  },
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
    defaultValue: {
      type: String
    }
  },
  watch: {
    defaultValue: function (value) {
      if (this.input && this.defaultValue) {
        this.input.value = value
      }
    }
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
    margin-bottom: 0.7rem;
    font-size: 1.2rem;
  }

  input {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #ccc;
    width: 17.188rem;
    transition: all 0.2s;
    text-align: center;

    &:focus {
      outline: none;
      border-bottom: 2px solid #ccc;
    }
  }
}
</style>
