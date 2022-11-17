<template>
  <div v-if="isEdit">
    <h2 class="popup__title">Dodaj nowego pracownika</h2>
    <input v-model="inputValue" class="popup__select" />

    <div class="popup__buttons">
      <button
        class="popup__button popup__button--success"
        @click="addNewEmployer"
      >
        Potwierdź
      </button>
      <button
        class="popup__button popup__button--error"
        @click="isEdit = false"
      >
        Zamknij
      </button>
    </div>
  </div>
  <div v-else>
    <h2 class="popup__title">Wybierz użytkownika</h2>
    <select @change="onChange" class="popup__select">
      <option v-for="(user, index) in usersData" :key="index" :value="user.id">
        {{ user.name }}
      </option>
    </select>
    <div class="popup__buttons">
      <button
        class="popup__button popup__button--success"
        @click="confirmSelect"
      >
        Potwierdź
      </button>
      <button
        class="popup__button popup__button--success"
        @click="isEdit = true"
      >
        Nowy pracownik
      </button>
    </div>
  </div>
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

    const isEdit = ref<boolean>(!(usersData.value.length > 0));

    const selectedUser = ref("");

    const inputValue = ref("");

    if (usersData.value.length > 0) {
      selectedUser.value = usersData.value[0].id;
    }

    return {
      usersData,
      selectedUser,
      isEdit,
      inputValue,
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
    async addNewEmployer() {
      if (this.inputValue) {
        await this.$store.dispatch(AuthActions.ADD_EMPLOYER, this.inputValue);
        const data = await this.$store.dispatch(AuthActions.GET_USERS);

        this.usersData = data;
        this.isEdit = false;
        this.inputValue = "";
      }
    },
  },
});
</script>
