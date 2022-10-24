<template>
  <header class="open-list__header">
    <h4>{{ title }}</h4>
    <component :is="icon"></component>
  </header>
  <div class="open-list__container"><open-list-element
    v-for="(item, index) in list"
    :key="item._id"
    :name="item.name"
    :quantity="item.quantity"
    :id="item._id"
    :type="listType"
  ></open-list-element></div>
  
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
    listType:{
      type:String,
      required:true
    }
  },
});
</script>

<style lang="scss">
.open-list {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem ;
  }
  &__container{
    max-height: 100%;
    overflow-y: auto;
      @include scrollbars(5px, #ccc, white);
  }
}
</style>
