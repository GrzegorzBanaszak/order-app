<template>
  <div :class="'form-list__new ' + setMargin()">
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
    <div class="form-list__new--checkbox">
      <input type="checkbox" v-model="payForDelivery" />
    </div>
    <input type="number" name="quantity" v-model="quantity" />
    <input type="number" name="price" v-model="price" />
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
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  components: { AcceptIcon, RemoveIcon, OrderFormListSelect },
  data() {
    return {
      searchSupplier: "",
      searchCommodity: "",
      supplierId: "",
      supplierName: "",
      commodityId: "",
      commodityName: "",
      quantity: 0,
      price: 0,
      payForDelivery: false,
      deliveryCost: 0 as number,
    };
  },
  methods: {
    selectSupplier(item: any) {
      this.searchSupplier = "";
      this.supplierId = item.id;
      this.supplierName = item.name;
      this.deliveryCost = item.price;
    },
    selectCustomer(item: any) {
      this.searchCommodity = "";
      this.commodityId = item.id;
      this.commodityName = item.name;
    },
    addItemToList() {
      if (
        this.supplierId &&
        this.commodityId &&
        this.price > 0 &&
        this.quantity > 0
      ) {
        const item: IOrderFormListElement = {
          id: uuidv4(),
          supplier: this.supplierId,
          supplierName: this.supplierName,
          commodity: this.commodityId,
          commodityName: this.commodityName,
          price: this.price,
          quantity: this.quantity,
          isCustomerPayForDelivery: this.payForDelivery,
          deliveryCost: this.deliveryCost,
        };

        this.$store.commit("addFormElement", item);

        this.$emit("hideForm");
      }
    },
    setMargin(): string {
      return this.$store.state.ordersState.ordersFormElements.size > 0
        ? "space-1"
        : "";
    },
  },
});
</script>
