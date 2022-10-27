<template>
  <div>{{ orderInfo.orderNumber }}</div>
  <div>{{ orderInfo.customer }}</div>
  <div>{{ getDate() }}</div>
  <div>{{ orderInfo.totalPrice }} zł</div>
  <div>{{ orderInfo.advance }} zł</div>
  <div>{{ orderInfo.status }}</div>
  <div class="list-element__controller">
    <router-link :to="'/d/orders/' + orderInfo.id">
      <info-black-icon />
    </router-link>
    <router-link :to="'/d/orders/edit/' + orderInfo.id">
      <pen-black-icon></pen-black-icon>
    </router-link>
    
  </div>
</template>

<script lang="ts">
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";
import PenBlackIcon from "../icons/PenBlackIcon.vue";
import { IOrder } from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: { InfoBlackIcon ,PenBlackIcon},
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
