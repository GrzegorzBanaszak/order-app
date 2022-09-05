<template>
  <header class="open-list__header">
    <h4>{{ title }}</h4>
    <component :is="icon"></component>
  </header>
  <open-list-element
    v-for="(item, index) in list"
    :key="index"
    :name="item.name"
    :quantity="item.quantity"
  ></open-list-element>
</template>

<script lang="ts">
import PackageBlueIcon from "@/icons/PackageBlueIcon.vue";
import CustomersBlueIcon from "@/icons/CustomersBlueIcon.vue";
import OpenListElement from "./OpenListElement.vue";
import { defineComponent, PropType } from "vue";
import { IOpenListElement } from "@/types";

export default defineComponent({
  components: { PackageBlueIcon, OpenListElement, CustomersBlueIcon },
  props: {
    icon: {
      type: String,
      default: "PackageBlueIcon",
    },
    list: {
      type: Array as PropType<Array<IOpenListElement>>,
      default: new Array(0),
    },
    title: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss">
.open-list {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
