<template>
  <div class="form-list__item">
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
    <input type="number" name="quantity" v-model="quantity" />
    <input type="number" name="price" v-model="price" />

    <div class="form-list__control">
      <accept-icon @click="updateElement"></accept-icon>
      <remove-icon @click="$emit('hideForm')"></remove-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { IOrderElementEditData, IOrderFormListElement } from "@/types";
import { defineComponent, PropType } from "vue";
import AcceptIcon from "@/icons/AcceptIcon.vue";
import RemoveIcon from "@/icons/RemoveIcon.vue";

export default defineComponent({
  components: { AcceptIcon, RemoveIcon },
  props: {
    orderItem: {
      type: Object as PropType<IOrderFormListElement>,
      required: true,
    },
  },
  data() {
    return {
      quantity: this.orderItem.quantity,
      price: this.orderItem.price,
    };
  },
  methods: {
    updateElement() {
      const dataToUpdate: IOrderElementEditData = {
        id: this.orderItem.id,
        quantity: this.quantity,
        price: this.price,
      };

      this.$store.commit("editFormElement", dataToUpdate);
      this.$emit("hideForm");
    },
  },
});
</script>

<style></style>
