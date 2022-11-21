<template>
  <div class="customers-list__element--item">
    <p class="customers-list__element--description">Nazwa</p>
    {{ commodityInfo.name }}
  </div>
  <div class="customers-list__element--item">
    <p class="customers-list__element--description">Ostatnia cena</p>
    {{ commodityInfo.lastPrice }} zł
  </div>
  <div class="customers-list__element--item">
    <p class="customers-list__element--description">Ostatnie zamówienie</p>
    {{ getDate() }}
  </div>
  <div class="list-element__controller">
    <router-link
      class="list-element__link list-element__info"
      :to="'/d/commodities/' + commodityInfo.id"
    >
      <info-black-icon />
    </router-link>
    <router-link
      class="list-element__link list-element__edit"
      :to="'/d/commodities/edit/' + commodityInfo.id"
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
  ICommodityInfo,
  IPopupConfirmData,
  IPopUpShowPayload,
  PopupTypeEnum,
} from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";
import { PopUpMutations } from "@/store/popupState";

export default defineComponent({
  components: { InfoBlackIcon, TrashBlackIcon, PenBlackIcon },
  props: {
    commodityInfo: {
      type: Object as PropType<ICommodityInfo>,
      required: true,
    },
  },
  methods: {
    getDate(): string {
      if (this.commodityInfo.lastOrder) {
        return moment(this.commodityInfo.lastOrder).format("DD/MM/YYYY");
      } else {
        return "Brak";
      }
    },
    removeElement() {
      const remove = async () => {
        await this.$store.dispatch("removeCommodity", this.commodityInfo.id);
      };

      const data: IPopupConfirmData = {
        remove,
        message: `Czy napewno chcesz usunąć ${this.commodityInfo.name}`,
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
