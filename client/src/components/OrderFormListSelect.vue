<template>
  <div class="form-list__selected">
    <input
      v-model="inputValue"
      :type="typeValue"
      @input="updateValue"
      @focusin="isFocus = true"
      @focusout="hideDropdown"
      autocomplete="off"
    />
    <div v-if="isFocus" class="form-list__dropdown">
      <span
        class="form-list__element"
        @click="selectedElement(item.id, item.name, item.price)"
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
    typeValue: {
      type: String,
      required: true,
    },
    listDropdown: {
      type: Object as PropType<Array<any>>,
      default: [],
    },
    searchValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputValue: "",
      isFocus: false,
    };
  },
  methods: {
    updateValue(e: Event) {
      this.$emit("reset");
      this.$emit("update:modelValue", (e.target as HTMLInputElement).value);
    },
    selectedElement(id: string, name: string, price: number) {
      this.isFocus = false;
      this.inputValue = name;
      this.$emit("selected", { id, price });
    },
    hideDropdown() {
      setTimeout(() => {
        this.isFocus = false;
      }, 100);
    },
  },
});
</script>
