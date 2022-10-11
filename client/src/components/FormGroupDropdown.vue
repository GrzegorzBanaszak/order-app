<template>
  <div class="form-group form-select">
    <label :for="nameValue">{{ labelValue }}</label>
    <input
      v-model="inputValue"
      @input="updateValue"
      :type="typeValue"
      :placeholder="placeholderValue"
      :name="nameValue"
      autocomplete="off"
    />
    <div v-if="searchValue !== ''" class="form-select__container">
      <span
        class="form-select__element"
        @click="selectedElement(item.id, item.name)"
        v-for="item in listDropdown"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

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
    searchValue: {
      type: String,
      required: true,
    },
    listDropdown: {
      type: Object as PropType<Array<any>>,
      default: [],
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
  methods: {
    updateValue(e: Event) {
      this.$emit("reset");
      this.$emit("update:modelValue", (e.target as HTMLInputElement).value);
    },
    selectedElement(id: string, name: string) {
      this.inputValue = name;
      this.$emit("selected", id);
    },
  },
});
</script>
