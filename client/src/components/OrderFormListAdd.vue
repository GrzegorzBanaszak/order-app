<template>
  <div class="form-list__new">
    <order-form-list-select
      type-value="text"
      v-model="searchCommodity"
      :list-dropdown="$store.getters.getFiltredCommodities(searchCommodity)"
      @selected="selectCustomer"
      @reset="() => (searchCommodity !== '' ? (searchCommodity = '') : null)"
    />
    <order-form-list-select
      type-value="text"
      v-model="searchSupplier"
      :list-dropdown="$store.getters.getFiltredSupplier(searchSupplier)"
      @selected="selectSupplier"
      @reset="() => (supplierId !== '' ? (supplierId = '') : null)"
    />
    <input type="number" readonly v-model="deliveryCost" />
    <input type="checkbox" v-model="payForDelivery" />
    <input type="number" name="quantity" v-model="quantity" />
    <input type="number" name="price" v-model="price" />
    <order-form-list-select
      type-value="text"
      :is-read-only="true"
      :list-dropdown="['W przygotowaniu', 'Wysłano', 'Do odbioru']"
      @selected="(item) => (status = item)"
    />
    <div class="form-list__control">
      <accept-icon @click="addItemToList"></accept-icon>
      <remove-icon @click="$emit('hideForm')"></remove-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AcceptIcon from "@/icons/AcceptIcon.vue";
import RemoveIcon from "@/icons/RemoveIcon.vue";
import OrderFormListSelect from "@/components/OrderFormListSelect.vue";
import { IOrderFormListElement } from "@/types";

export default defineComponent({
  components: { AcceptIcon, RemoveIcon, OrderFormListSelect },
  data() {
    return {
      searchSupplier: "",
      searchCommodity: "",
      supplierId: "",
      commodityId: "",
      quantity: 0,
      price: 0,
      payForDelivery: false,
      deliveryCost: 0,
      status: "",
    };
  },
  methods: {
    selectSupplier(item: any) {
      this.searchSupplier = "";
      this.supplierId = item.id;
      this.deliveryCost = item.price;
    },
    selectCustomer(item: any) {
      (this.searchCommodity = ""), (this.commodityId = item.id);
    },
    addItemToList() {
      if (
        this.supplierId &&
        this.commodityId &&
        this.price > 0 &&
        this.quantity > 0 &&
        this.status
      ) {
        const item: IOrderFormListElement = {
          supplierId: this.supplierId,
          commodityId: this.commodityId,
          price: this.price,
          quantity: this.quantity,
          status: this.status,
        };

        this.$emit("addToList", item);
      }
    },
  },
});
</script>
