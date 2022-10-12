<template>
  <div class="form-list__new">
    <input type="text" />
    <order-form-list-select
      type-value="text"
      v-model="searchSupplier"
      :search-value="searchSupplier"
      :list-dropdown="$store.getters.getFiltred(searchSupplier)"
      @selected="selectSupplier"
      @reset="() => (supplierId !== '' ? (supplierId = '') : null)"
    />
    <input type="number" readonly v-model="deliveryCost" />
    <input type="checkbox" v-model="payForDelivery" />
    <input type="number" name="quantity" v-model="quantity" />
    <input type="number" name="price" v-model="price" />
    <input type="text" />
    <div class="form-list__control">
      <accept-icon></accept-icon>
      <remove-icon @click="$emit('hideForm')"></remove-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AcceptIcon from "@/icons/AcceptIcon.vue";
import RemoveIcon from "@/icons/RemoveIcon.vue";
import OrderFormListSelect from "@/components/OrderFormListSelect.vue";

export default defineComponent({
  components: { AcceptIcon, RemoveIcon, OrderFormListSelect },
  data() {
    return {
      searchSupplier: "",
      supplierId: "",
      quantity: 0,
      price: 0,
      payForDelivery: false,
      deliveryCost: 0,
    };
  },
  methods: {
    selectSupplier({ id, price }: { id: string; price: number }) {
      this.searchSupplier = "";
      this.supplierId = id;
      this.deliveryCost = price;
    },
  },
});
</script>
