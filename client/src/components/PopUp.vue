<template>
  <div v-if="$store.state.popupState.layoutType === 'info'" :class="'popup ' + $store.state.popupState.styleType">
    <h3 class="popup__header">
      {{ $store.state.popupState.title }}
    </h3>
    <div class="popup__body">
      <p v-for="item in $store.state.popupState.message">{{ item }}</p>
      <button @click="$store.commit('popupReset')">Ok</button>
    </div>
  </div>
  <div v-else class="popup">
    <h3 class="popup__header">
      {{ $store.state.popupState.title }}
    </h3>
    <div class="popup__body">
      <p v-for="item in $store.state.popupState.message">{{ item }}</p>
      <div class="popup__btns">
        <button @click="$store.dispatch('removeConfirm')">Tak</button>
        <button @click="$store.commit('popupReset')">Nie</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss">
.popup {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 2rem;

  &__header {
    text-align: center;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-size: 1.5rem;
  }

  &__body {
    p {
      margin: 0.5rem 0;
    }

    button {
      display: block;
      width: 100%;
      margin-top: 1.4rem;
      padding: 0.7rem;
      border: none;
      border-radius: 15px;
      font-weight: 700;
      font-size: 1.1rem;
      cursor: pointer;
    }
  }

  &__btns {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
}

.type {
  &-error {
    h3 {
      color: #b71c1c;
    }

    button {
      background-color: #b71c1c;
      color: white;
    }
  }

  &-success {
    h3 {
      color: #33691e;
    }

    button {
      background-color: #33691e;
      color: white;
    }
  }
}
</style>
