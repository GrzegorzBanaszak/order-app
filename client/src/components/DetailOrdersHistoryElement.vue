<template>
  <div>{{ orderInfo.orderNumber }}</div>
  <div>{{ getDate() }}</div>
  <div>{{ orderInfo.quantity }} szt</div>
  <div>{{ orderInfo.totalPrice }} zł</div>
  <div>{{ orderInfo.status }}</div>
  <div>
    <router-link :to="'/d/orders/' + orderInfo.id"><info-black-icon /></router-link>
  </div>
</template>

<script lang="ts">
import { IOrderHistoryInfo } from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";

export default defineComponent({
  components: { InfoBlackIcon },
  props: {
    orderInfo: {
      type: Object as PropType<IOrderHistoryInfo>,
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
