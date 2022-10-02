<template>
  <div class="form-group form-select">
    <label :for="nameValue">{{ labelValue }}</label>
    <input
      v-model="inputValue"
      @input="updateValue"
      :type="typeValue"
      :placeholder="placeholderValue"
      :name="nameValue"
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

<style lang="scss">
.form-select {
  position: relative;
  &__container {
    @include scrollbars(5px, #ccc, white);
    position: absolute;
    top: 5.313rem;
    max-height: 120px;
    width: 17.188rem;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    background-color: white;
    overflow: auto;
    border-radius: 0 0 10px 10px;
  }
  &__element {
    padding: 0.5rem 0.2rem;
    cursor: pointer;

    &:hover {
      background-color: #fafafa;
    }
  }
}
</style>
