<template>
  <div>{{ workerData.name }}</div>
  <div>{{ workerData.phoneNumber }}</div>
  <div>
    <router-link :to="'/d/customers/' + workerData.id"
      ><dotts-icon
    /></router-link>
  </div>
</template>

<script lang="ts">
import { Worker } from "@/types";
import { defineComponent, PropType } from "vue";
import DottsIcon from "@/icons/DottsIcon.vue";

export default defineComponent({
  components: { DottsIcon },
  props: {
    workerData: {
      type: Object as PropType<Worker>,
      required: true,
    },
  },
});
</script>

<style></style>
