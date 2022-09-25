<template>
  <div class="open-orders__element">
    <div>{{ order?.customer }}</div>
    <div>{{ getDate() }}</div>
    <div>{{ order?.quantity }}</div>
    <div>{{ order?.totalPrice }} zł</div>
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
