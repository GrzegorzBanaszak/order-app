<template>
  <div class="form-list__selected">
    <input
      v-model="inputValue"
      :type="typeValue"
      @input="updateValue"
      @focusin="isFocus = true"
      @focusout="hideDropdown"
      autocomplete="off"
      :readonly="isReadOnly"
    />
    <div v-if="isFocus" class="form-list__dropdown">
      <span
        class="form-list__element"
        @click="selectedElement(item)"
        v-for="item in listDropdown"
        >{{ item.name ? item.name : item }}</span
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
    isReadOnly: {
      type: Boolean,
      default: false,
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
    selectedElement(item: any) {
      this.isFocus = false;
      this.inputValue = item.name ? item.name : item;
      this.$emit("selected", item);
    },
    hideDropdown() {
      setTimeout(() => {
        this.isFocus = false;
      }, 100);
    },
  },
});
</script>
