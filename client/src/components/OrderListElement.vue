<template>
  <div class="orders-list__element--item">
    <p class="orders-list__element--description">Numer zamówienia</p>
    {{ orderInfo.orderNumber }}
  </div>
  <div class="orders-list__element--item">
    <p class="orders-list__element--description">Klient</p>
    {{ orderInfo.customer }}
  </div>
  <div class="orders-list__element--item">
    <p class="orders-list__element--description">Data zamówienia</p>
    {{ getDate() }}
  </div>
  <div class="orders-list__element--item">
    <p class="orders-list__element--description">Koszt brutto</p>
    {{ orderInfo.totalPrice }} zł
  </div>
  <div class="orders-list__element--item">
    <p class="orders-list__element--description">Zaliczka</p>
    {{ orderInfo.advance }} zł
  </div>
  <div class="orders-list__element--item">
    <p class="orders-list__element--description">Status</p>
    {{ orderInfo.status }}
  </div>
  <div class="list-element__controller">
    <router-link
      class="list-element__link list-element__info"
      :to="'/d/orders/' + orderInfo.id"
    >
      <info-black-icon />
    </router-link>
    <router-link
      class="list-element__link list-element__edit"
      :to="'/d/orders/edit/' + orderInfo.id"
    >
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
  components: { InfoBlackIcon, PenBlackIcon },
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
