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
      <order-form-list-add
        @hideForm="toggleShowAddForm"
        @addToList="addItemToList"
        v-if="isAddFormShow"
      ></order-form-list-add>
      <button @click="toggleShowAddForm" v-else class="form-list__button">
        Dodaj towar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderFormListAdd from "@/components/OrderFormListAdd.vue";
import { IOrderFormListElement } from "@/types";

export default defineComponent({
  components: { OrderFormListAdd },
  mounted() {
    this.$store.dispatch("getSuppliers");
  },
  data() {
    return {
      isAddFormShow: false,
    };
  },
  methods: {
    toggleShowAddForm() {
      this.isAddFormShow = !this.isAddFormShow;
    },
    addItemToList(item: IOrderFormListElement) {
      this.$emit("addToList", item);
      this.isAddFormShow = false;
    },
  },
});
</script>
