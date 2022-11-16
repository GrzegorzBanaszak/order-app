<template>
  <h2 class="popup__title">Wybierz użytkownika</h2>
  <select @change="onChange" class="popup__select">
    <option v-for="(user, index) in usersData" :key="index" :value="user.id">
      {{ user.name }}
    </option>
  </select>
  <button class="popup__button popup__button--success" @click="confirmSelect">
    Potwierdz
  </button>
</template>
>

<script lang="ts">
import { useStore } from "@/store";
import { AuthActions, AuthMutations } from "@/store/authState";
import { PopUpMutations } from "@/store/popupState";
import { defineComponent, ref, SelectHTMLAttributes } from "vue";

export default defineComponent({
  async setup() {
    const store = useStore();

    const users = await store.dispatch(AuthActions.GET_USERS);

    const usersData = ref<Array<any>>(users);

    const selectedUser = ref(users[0].id);

    return {
      usersData,
      selectedUser,
    };
  },
  props: {
    popupId: {
      type: String,
      required: true,
    },
  },
  methods: {
    onChange(e: Event) {
      this.selectedUser = (e.target as SelectHTMLAttributes).value;
    },
    confirmSelect() {
      const selected = this.usersData.find((x) => x.id === this.selectedUser);

      if (selected) {
        this.$store.commit(AuthMutations.SET_USER_DATA, selected);
        this.$store.commit(PopUpMutations.REMOVE_POPUP, this.popupId);
      }
    },
  },
});
</script>
