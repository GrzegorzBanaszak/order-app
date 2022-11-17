<template>
  <div class="popup">
    <div
      class="popup__container"
      v-for="item in $store.state.popupState.popups"
      :key="item[0]"
    >
      <pop-up-show-messages
        v-if="item[1].type === 'display-messages'"
        :item-data="item[1].data"
        :popup-id="item[0]"
      ></pop-up-show-messages>

      <pop-up-confirm
        v-else-if="item[1].type === 'confirm-remove'"
        :item-data="item[1].data"
        :popup-id="item[0]"
      >
      </pop-up-confirm>

      <Suspense v-else-if="item[1].type === 'select-user'">
        <pop-up-select-user :popup-id="item[0]"> </pop-up-select-user>
        <template #fallback>Loading.. </template>
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PopUpShowMessages from "@/components/PopUpShowMessages.vue";
import PopUpConfirm from "./PopUpConfirm.vue";
import PopUpSelectUser from "./PopUpSelectUser.vue";

export default defineComponent({
  components: {
    PopUpShowMessages,
    PopUpConfirm,
    PopUpSelectUser,
  },
  methods: {},
});
</script>

<style lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  &__container {
    position: absolute;
    padding: 2rem 5rem;
    background-color: white;
  }
  &__title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
    &--success {
      color: #1b5e20;
    }
    &--error {
      color: #b71c1c;
    }
  }
  p {
    margin: 0.5rem 0;
  }
  &__buttons {
    display: flex;
    gap: 1rem;
  }
  &__button {
    margin-top: 1rem;
    display: block;
    width: 100%;
    border: none;
    padding: 0.7rem 0.5rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    &--success {
      color: white;
      background-color: #1b5e20;
    }
    &--error {
      color: white;
      background-color: #b71c1c;
    }
  }
  &__select {
    display: block;
    width: 100%;
    padding: 0.5rem 0;
    text-align: center;
    font-size: 1rem;
  }
}
</style>
