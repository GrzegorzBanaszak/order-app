<template>
  <div class="open-orders__element">
    <div>{{ order?.customer.name }}</div>
    <div>{{ getDate() }}</div>
    <div>{{ getQuantity() }}</div>
    <div>{{ getTotal() }} zł</div>
    <div>{{ order?.status }}</div>
    <div><dotts-icon-vue /></div>
  </div>
</template>

<script lang="ts">
import DottsIconVue from "@/icons/DottsIcon.vue";
import { IOrder } from "@/types";
import { defineComponent, PropType } from "vue";
import moment from "moment";

export default defineComponent({
  components: { DottsIconVue },
  props: {
    order: {
      type: Object as PropType<IOrder>,
    },
  },
  methods: {
    getDate() {
      return moment(this.order?.createdAt).format("DD/MM/YYYY");
    },
    getQuantity() {
      let quantity = 0;
      this.order?.commodities.forEach((commodity) => {
        quantity += commodity.quantity;
      });

      return quantity;
    },
    getTotal() {
      let total = 0;
      this.order?.commodities.forEach((commodity) => {
        total += commodity.quantity * commodity.price;
      });

      return total;
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
    margin-bottom: 1.2rem;
  }
}
</style>
