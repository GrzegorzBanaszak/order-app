<template>
  <div class="form-group-textarea">
    <label :for="nameValue">{{ labelValue }}</label>
    <textarea
      ref="input"
      @input="updateValue"
      :type="typeValue"
      :placeholder="placeholderValue"
      :name="nameValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const input = ref<HTMLInputElement | null>(null);

    return {
      input,
    };
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
      type: String,
    },
  },
  watch: {
    defaultValue: function (value) {
      if (this.input && this.defaultValue) {
        this.input.value = value;
      }
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
.form-group-textarea {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  label {
    margin-bottom: 1rem;
    font-size: 1.6rem;
  }
  textarea {
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    border: 1px solid #ccc;
    width: 17.188rem;
    transition: all 0.2s;
    resize: none;
    height: 10rem;
    &:focus {
      outline: none;
      border-bottom: 2px solid #ccc;
    }
  }
}
</style>
