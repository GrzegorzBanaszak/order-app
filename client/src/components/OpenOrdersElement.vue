<template>
  <div class="open-orders__element">
    <div>{{ order?.customer }}</div>
    <div>{{ getDate() }}</div>
    <div>{{ order?.quantity }}</div>
    <div>{{ order?.totalPrice }} zł</div>
    <div>{{ order?.status }}</div>
    <div><router-link :to="`/d/orders/${order?.id}`">
      <info-black-icon />
    </router-link></div>
    
  </div>
</template>

<script lang="ts">
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";
import { IOrder } from "@/types";
import { defineComponent, PropType } from "vue";
import moment from "moment";

export default defineComponent({
  components: { InfoBlackIcon },
  props: {
    order: {
      type: Object as PropType<IOrder>,
    },
  },
  methods: {
    getDate() {
      return moment(this.order?.createdAt).format("DD/MM/YYYY");
    },
  },
});
</script>

<style lang="scss">
.open-orders {
  &__element {
    @include orderGrid;
    div {
      text-align: center;
    }
    margin: 0.7rem;
  }
  
}
</style>
