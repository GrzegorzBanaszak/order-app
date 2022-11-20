<template>
  <div>{{ supplierInfo.name }}</div>
  <div>{{ supplierInfo.price }}</div>
  <div>
    {{ getDate() }}
  </div>
  <div>{{ supplierInfo.numberOfOrders }}</div>
  <div class="list-element__controller">
    <router-link
      class="list-element__link list-element__info"
      :to="'/d/suppliers/' + supplierInfo.id"
    >
      <info-black-icon />
    </router-link>
    <router-link
      class="list-element__link list-element__edit"
      :to="'/d/suppliers/edit/' + supplierInfo.id"
    >
      <pen-black-icon></pen-black-icon>
    </router-link>
    <div class="list-element__link list-element__delete" @click="removeElement">
      <trash-black-icon></trash-black-icon>
    </div>
  </div>
</template>

<script lang="ts">
import TrashBlackIcon from "@/icons/TrashBlackIcon.vue";
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";
import PenBlackIcon from "../icons/PenBlackIcon.vue";
import {
  IPopupConfirmData,
  IPopUpShowPayload,
  ISupplierInfo,
  PopupTypeEnum,
} from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";
import { PopUpMutations } from "@/store/popupState";

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
      const remove = async () => {
        await this.$store.dispatch("removeSupplier", this.supplierInfo.id);
      };

      const data: IPopupConfirmData = {
        remove,
        message: `Czy napewno chcesz usunąć ${this.supplierInfo.name}`,
      };

      const payloadData: IPopUpShowPayload = {
        type: PopupTypeEnum.CONFIRM_REMOVE,
        data,
      };

      this.$store.commit(PopUpMutations.POPUP_SHOW, payloadData);
    },
  },
});
</script>

<style></style>
