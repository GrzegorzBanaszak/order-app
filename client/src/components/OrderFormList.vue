<template>
  <div class="form-list">
    <div class="form-list__header">
      <div>Nazwa</div>
      <div>Dostawca</div>
      <div>Cena dostawy</div>
      <div>Liczona dostawa</div>
      <div>Ilość</div>
      <div>Cena</div>
      <div>Status</div>
    </div>
    <div class="form-list__body">
      <order-form-list-element
        v-for="(item, index) in $store.state.ordersState.ordersFormElements"
        :key="index"
        :order-item="item"
      ></order-form-list-element>
      <order-form-list-add
        @hideForm="toggleShowAddForm"
        v-if="isAddFormShow"
      ></order-form-list-add>
      <button
        @click="toggleShowAddForm"
        v-else
        :class="'form-list__button ' + setMargin()"
      >
        Dodaj towar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderFormListAdd from "@/components/OrderFormListAdd.vue";
import OrderFormListElement from "@/components/OrderFormListElement.vue";

export default defineComponent({
  components: { OrderFormListAdd, OrderFormListElement },
  data() {
    return {
      isAddFormShow: false,
    };
  },
  methods: {
    toggleShowAddForm() {
      this.isAddFormShow = !this.isAddFormShow;
    },
    setMargin(): string {
      return this.$store.state.ordersState.ordersFormElements.length > 0
        ? "space-1"
        : "";
    },
  },
});
</script>
