<template>
  <div>{{ orderInfo.orderNumber }}</div>
  <div>{{ orderInfo.customer }}</div>
  <div>{{ getDate() }}</div>
  <div>{{ orderInfo.totalPrice }} zł</div>
  <div>{{ orderInfo.advance }} zł</div>
  <div>{{ orderInfo.status }}</div>
  <div>
    <router-link :to="'/d/orders/' + orderInfo.id"><dotts-icon /></router-link>
  </div>
</template>

<script lang="ts">
import DottsIcon from "@/icons/DottsIcon.vue";
import { IOrder } from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: { DottsIcon },
  props: {
    orderInfo: {
      type: Object as PropType<IOrder>,
      required: true,
    },
  },
  methods: {
    getDate(): string {
      return moment(this.orderInfo.createdAt).format("DD/MM/YYYY");
    },
  },
});
</script>

<style></style>
