<template>
  <div class="form-group form-select">
    <label :for="nameValue">{{ labelValue }}</label>
    <input ref="input" @input="updateValue" :type="typeValue" :placeholder="placeholderValue" :name="nameValue"
      autocomplete="off" @focusin="isFocus = true" @focusout="hideDropdown" />
    <div v-if="isFocus" class="form-select__container">
      <span class="form-select__element" @click="selectedElement(item.id, item.name)" v-for="item in listDropdown">{{
      item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
  setup() {
    const input = ref<HTMLInputElement | null>(null)

    const isFocus = ref<boolean>(false)
    return {
      input, isFocus
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
    searchValue: {
      type: String,
      required: true,
    },
    listDropdown: {
      type: Object as PropType<Array<any>>,
      default: [],
    },
    defaultValue: {
      type: String
    }
  },
  watch: {
    defaultValue: function (value) {
      if (this.input) {
        this.input.value = value
      }
    }
  },

  methods: {
    updateValue(e: Event) {
      this.$emit("reset");
      this.$emit("update:modelValue", (e.target as HTMLInputElement).value);
    },
    selectedElement(id: string, name: string) {
      if (this.input) this.input.value = name
      this.$emit("selected", id);
    },
    hideDropdown() {
      setTimeout(() => {
        this.isFocus = false;
      }, 100);
    },
  },
});
</script>
