<template>
  <form class="form-order" @submit="submitForm">
    <h2 class="add-form__header">Dodaj nowe zamówienie</h2>
    <div class="form-order__header">
      <form-group
        v-model="advance"
        label-value="Zaliczka"
        type-value="number"
        placeholder-value="Wpisz zaliczkę"
        name-value="advance"
      ></form-group>
      <form-group-dropdown
        v-model="searchCustomer"
        :search-value="searchCustomer"
        label-value="Klient"
        type-value="text"
        placeholder-value="Wpisz nazwę klienta"
        name-value="company"
        :listDropdown="$store.getters.getFiltredCustomer(searchCustomer)"
        @selected="selectCustomer"
        @reset="isCustomerSelected"
      ></form-group-dropdown>
      <form-group-select
        label-value="Status"
        :list-dropdown="[
          'W przygotowaniu',
          'Wysłano',
          'Do odbioru',
          'Odebrano',
        ]"
        @selected="(item:string) => (status = item)"
      ></form-group-select>
    </div>
    <order-form-list></order-form-list>
    <button class="add-form__button" type="submit">Dodaj</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormGroup from "@/components/FormGroup.vue";
import FormGroupDropdown from "@/components/FormGroupDropdown.vue";
import FormGroupSelect from "@/components/FormGroupSelect.vue";
import OrderFormList from "@/components/OrderFormList.vue";
import { IOrderPost, IOrderPostCommodity } from "@/types";

export default defineComponent({
  components: { FormGroup, FormGroupDropdown, FormGroupSelect, OrderFormList },
  mounted() {
    this.$store.dispatch("getCustomers");
    this.$store.dispatch("getSuppliers");
    this.$store.dispatch("setCommodities");
    this.$store.commit("resetOrdersElements");
  },
  data() {
    return {
      advance: 0,
      searchCustomer: "",
      customerId: "",
      status: "W przygotowaniu",
    };
  },
  methods: {
    selectCustomer(id: string) {
      this.searchCustomer = "";
      this.customerId = id;
    },
    isCustomerSelected() {
      if (this.customerId !== "") {
        this.customerId = "";
      }
    },
    async submitForm(e: Event) {
      e.preventDefault();

      const commoditiesList = new Array<IOrderPostCommodity>(0);

      if (this.$store.state.ordersState.ordersFormElements.size > 0) {
        this.$store.state.ordersState.ordersFormElements.forEach((item) => {
          commoditiesList.push({
            commodity: item.commodity,
            supplier: item.supplier,
            quantity: item.quantity,
            price: item.price,
            deliveryPrice: item.isCustomerPayForDelivery ? item.deliveryCost : 0,
          });
        });
      }

      const data: IOrderPost = {
        customer: this.customerId,
        advance: Number(this.advance),
        status: this.status,
        commodities: commoditiesList,
      };

      await this.$store.dispatch("addOrder", data);

      if (!this.$store.state.ordersState.isError) {
        this.$router.replace({ replace: true, path: "/d/orders" });
      } else {
        this.$store.commit("toggleOrderError");
      }
    },
  },
});
</script>
