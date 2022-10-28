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
        :default-value="advance"
      ></form-group>
      <form-group-dropdown
        v-model="searchCustomer"
        :search-value="searchCustomer"
        label-value="Klient"
        type-value="text"
        placeholder-value="Wpisz nazwę klienta"
        name-value="company"
        :default-value="customerName"
        :listDropdown="$store.getters.getFiltredCustomer(searchCustomer)"
        @selected="selectCustomer"
        @reset="isCustomerSelected"
      ></form-group-dropdown>
      <form-group-select
        label-value="Status"
        :default-value="status"
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
import { defineComponent, ref } from "vue";
import FormGroup from "@/components/FormGroup.vue";
import FormGroupDropdown from "@/components/FormGroupDropdown.vue";
import FormGroupSelect from "@/components/FormGroupSelect.vue";
import OrderFormList from "@/components/OrderFormList.vue";
import {
  IOrderFormListElement,
  IOrderPost,
  IOrderPostCommodity,
} from "@/types";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { v4 as uuidv4 } from "uuid";

export default defineComponent({
  components: { FormGroup, FormGroupDropdown, FormGroupSelect, OrderFormList },
  setup() {
    const store = useStore();
    const route = useRoute();

    const customerName = ref<string>("");
    const searchCustomer = ref<string>("");
    const customerId = ref<string>("");
    const advance = ref<number>(0);
    const status = ref<string>("W przygotowaniu");

    const commoditiesList = new Map<string, IOrderFormListElement>();

    store.dispatch("getOrderDetail", route.params.id).then(() => {
      if (store.state.ordersState.orderDetail) {
        customerName.value = store.state.ordersState.orderDetail.customer.name;
        customerId.value = store.state.ordersState.orderDetail.customer.id;
        advance.value = store.state.ordersState.orderDetail.advance;
        status.value = store.state.ordersState.orderDetail.status;
        store.state.ordersState.orderDetail.commodities.forEach((item) => {
          const id = uuidv4();

          const parsedElement: IOrderFormListElement = {
            id,
            supplier: item.supplierId,
            supplierName: item.supplierName,
            commodity: item.id,
            commodityName: item.name,
            deliveryCost: item.deliveryPrice,
            price: item.price,
            quantity: item.quantity,
            isCustomerPayForDelivery: item.deliveryPrice > 0,
          };

          commoditiesList.set(id, parsedElement);
        });

        store.commit("setOrderFormElements", commoditiesList);
      }
    });

    return { customerName, customerId, advance, status, searchCustomer };
  },
  mounted() {
    this.$store.dispatch("getCustomers");
    this.$store.dispatch("getSuppliers");
    this.$store.dispatch("setCommodities");
    this.$store.commit("resetOrdersElements");
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
            deliveryPrice: item.isCustomerPayForDelivery
              ? item.deliveryCost
              : 0,
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
