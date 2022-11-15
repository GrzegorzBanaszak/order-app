<template>
  <h2 class="popup__title">Potwierdz</h2>
  <p>{{ itemData.message }}</p>
  <div class="popup__buttons"></div>
  <button class="popup__button popup__button--success" @click="confirmRemove">
    Tak
  </button>
  <button
    class="popup__button popup__button--error"
    @click="$store.commit('removePopup', popupId)"
  >
    Nie
  </button>
</template>

<script lang="ts">
import { IPopupConfirmData } from "@/types";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    itemData: {
      type: Object as PropType<IPopupConfirmData>,
      required: true,
    },
    popupId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async confirmRemove() {
      await this.itemData.remove();
      this.$store.commit("removePopup", this.popupId);
    },
  },
});
</script>
