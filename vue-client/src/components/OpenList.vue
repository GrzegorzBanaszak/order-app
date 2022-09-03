<template>
  <header class="open-list__header">
    <h4>Najczęściej zamawiane</h4>
    <component :is="icon"></component>
  </header>
  <open-list-element
    v-for="(item, index) in list"
    :key="index"
    :name="item.name"
    :quantity="item.quantity"
  ></open-list-element>
</template>

<script>
import PackageBlueIcon from "@/icons/PackageBlueIcon.vue";
import OpenListElement from "./OpenListElement.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { PackageBlueIcon, OpenListElement },
  props: {
    icon: {
      type: String,
      default: "PackageBlueIcon",
    },
    list: {
      type: Array,
      default: new Array(0),
    },
  },
});
</script>

<style lang="scss">
.open-list {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
