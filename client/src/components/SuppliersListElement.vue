<template>
  <div>{{ supplierInfo.name }}</div>
  <div>{{ supplierInfo.price }}</div>
  <div>
    {{ getDate() }}
  </div>
  <div>{{ supplierInfo.numberOfOrders }}</div>
  <div class="list-element__controller">
    <router-link :to="'/d/suppliers/' + supplierInfo.id">
      <info-black-icon />
    </router-link>
    <router-link :to="'/d/suppliers/edit/' + supplierInfo.id">
      <pen-black-icon></pen-black-icon>
    </router-link>
    <trash-black-icon @click="removeElement"></trash-black-icon>
  </div>
</template>

<script lang="ts">
import TrashBlackIcon from "@/icons/TrashBlackIcon.vue";
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";
import PenBlackIcon from "../icons/PenBlackIcon.vue";
import { ISupplierInfo } from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: { InfoBlackIcon, TrashBlackIcon, PenBlackIcon },
  props: {
    supplierInfo: {
      type: Object as PropType<ISupplierInfo>,
      required: true,
    },
  },
  methods: {
    getDate(): string {
      if (this.supplierInfo.lastOrder) {
        return moment(this.supplierInfo.lastOrder).format("DD/MM/YYYY");
      } else {
        return "Brak";
      }
    },
    removeElement() {
      // const remove = async () => {
      //   await this.$store.dispatch("removeCustomer", this.customerInfo.id)
      // }
      // const messages = ['Czy napewno chcesz usunąć', this.customerInfo.name]
      // const data: IPopupConfirmData = {
      //   remove,
      //   messages
      // }
      // this.$store.commit("displayRemovePopup", data)
    },
  },
});
</script>

<style></style>
