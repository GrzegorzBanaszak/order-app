<template>
  <div>{{ customerInfo.name }}</div>
  <div>{{ customerInfo.companyName }}</div>
  <div>
    {{ getDate() }}
  </div>
  <div>{{ customerInfo.phoneNumber }}</div>
  <div class="list-element__controller">
    <router-link :to="'/d/customers/' + customerInfo.id">
      <info-black-icon />
    </router-link>
    <router-link :to="'/d/customers/edit/' + customerInfo.id">
      <pen-black-icon></pen-black-icon>
    </router-link>
    <trash-black-icon @click="removeElement"></trash-black-icon>
  </div>
</template>

<script lang="ts">
import { ICustomerInfo, IPopupConfirmData } from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";
import DottsIcon from "@/icons/DottsIcon.vue";
import TrashBlackIcon from "@/icons/TrashBlackIcon.vue";
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";
import PenBlackIcon from "../icons/PenBlackIcon.vue";


export default defineComponent({
  components: { DottsIcon, InfoBlackIcon, TrashBlackIcon, PenBlackIcon },
  props: {
    customerInfo: {
      type: Object as PropType<ICustomerInfo>,
      required: true,
    },
  },
  methods: {
    getDate(): string {
      if (this.customerInfo.lastOrder) {
        return moment(this.customerInfo.lastOrder).format("DD/MM/YYYY");
      } else {
        return "Brak";
      }
    },
    removeElement() {

      const remove = async () => {
        await this.$store.dispatch("removeCustomer", this.customerInfo.id)
      }

      const messages = ['Czy napewno chcesz usunąć', this.customerInfo.name]

      const data: IPopupConfirmData = {
        remove,
        messages
      }

      this.$store.commit("displayRemovePopup", data)
    }
  },
});
</script>
