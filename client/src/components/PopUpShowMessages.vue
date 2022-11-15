<template>
  <h2 :class="`popup__title popup__title--${itemData.type}`">
    {{ itemData.title }}
  </h2>
  <p v-for="(item, index) in itemData.messages" :key="index">{{ item }}</p>
  <button
    :class="`popup__button popup__button--${itemData.type}`"
    @click="$store.commit('removePopup', popupId)"
  >
    Zamknij
  </button>
</template>

<script lang="ts">
import { IPopupShowMessages } from "@/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    itemData: {
      type: Object as PropType<IPopupShowMessages>,
      required: true,
    },
    popupId: {
      type: String,
      required: true,
    },
  },
});
</script>

<style></style>
