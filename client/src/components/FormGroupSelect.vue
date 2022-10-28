``
<template>
  <div class="form-group form-select">
    <label>{{ labelValue }}</label>
    <div @click="showList = !showList" class="form-select__selected">
      {{ selectedValue }}
    </div>
    <div v-if="showList" class="form-select__container">
      <span
        class="form-select__element"
        @click="selectedElement(item)"
        v-for="item in listDropdown"
        >{{ item }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    labelValue: {
      type: String,
      required: true,
    },
    listDropdown: {
      type: Object as PropType<Array<any>>,
      default: [],
    },
    defaultValue: {
      type: String,
    },
  },
  mounted() {
    this.selectedValue = this.listDropdown[0];
  },
  watch: {
    defaultValue: function (value) {
      this.selectedValue = value;
    },
  },
  data() {
    return {
      selectedValue: "",
      showList: false,
    };
  },
  methods: {
    selectedElement(item: string) {
      this.selectedValue = item;
      this.showList = false;
      this.$emit("selected", item);
    },
  },
});
</script>
