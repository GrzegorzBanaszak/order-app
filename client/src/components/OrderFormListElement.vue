<template>
  <order-form-list-edit
    v-if="isEdit"
    :order-item="orderItem"
    @hideForm="isEdit = false"
  ></order-form-list-edit>
  <div v-else class="form-list__item">
    <div>{{ orderItem.commodityName }}</div>
    <div>{{ orderItem.supplierName }}</div>
    <div>{{ orderItem.deliveryCost }}</div>
    <div>
      <input
        type="checkbox"
        readonly
        :value="orderItem.isCustomerPayForDelivery"
      />
    </div>
    <div>{{ orderItem.quantity }}</div>
    <div>{{ orderItem.price }}</div>
    <div class="form-list__control">
      <edit-icon @click="isEdit = !isEdit"></edit-icon>
      <trash-icon></trash-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { IOrderFormListElement } from "@/types";
import { defineComponent, PropType } from "vue";
import TrashIcon from "@/icons/TrashIcon.vue";
import EditIcon from "@/icons/EditIcon.vue";
import OrderFormListEdit from "@/components/OrderFormListEdit.vue";

export default defineComponent({
  components: { TrashIcon, EditIcon, OrderFormListEdit },
  props: {
    orderItem: {
      type: Object as PropType<IOrderFormListElement>,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false as boolean,
    };
  },
});
</script>
