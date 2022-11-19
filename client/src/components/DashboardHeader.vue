<template>
  <header :class="classType">
    <div class="avatar">
      <p class="avatar__username">{{ $store.getters.getUsername }}</p>
      <div class="avatar__icon"><users-icon /></div>
    </div>
    <div class="avatar__toggle" @click="$emit('toggleNav')">
      <no-icon v-if="isOpen" />
      <menu-icon v-else />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UsersIcon from "@/icons/UsersIcon.vue";
import MenuIcon from "@/icons/MenuIcon.vue";
import NoIcon from "@/icons/NoIcon.vue";
export default defineComponent({
  components: {
    UsersIcon,
    MenuIcon,
    NoIcon,
  },
  props: {
    classType: {
      type: String,
      default: "",
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.avatar {
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
  align-items: center;

  &__icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #26a69a;
    fill: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}

@include lg {
  .avatar {
    flex-direction: row;
    &__toggle {
      display: none;
    }
  }
}
</style>
