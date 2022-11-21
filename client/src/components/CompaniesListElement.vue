<template>
  <div class="customers-list__element--item">
    <p class="customers-list__element--description">Nazwa</p>
    {{ companyInfo.name }}
  </div>
  <div class="customers-list__element--item">
    <p class="customers-list__element--description">Nip</p>
    {{ companyInfo.nip }}
  </div>
  <div class="customers-list__element--item">
    <p class="customers-list__element--description">Ostatnie zamówienie</p>
    {{ getDate() }}
  </div>
  <div class="customers-list__element--item">
    <p class="customers-list__element--description">Ilość pracowników</p>
    {{ companyInfo.employers }}
  </div>
  <div class="list-element__controller">
    <router-link
      class="list-element__link list-element__info"
      :to="'/d/companies/' + companyInfo.id"
    >
      <info-black-icon />
    </router-link>
    <router-link
      class="list-element__link list-element__edit"
      :to="'/d/companies/edit/' + companyInfo.id"
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
  ICompanyInfo,
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
    companyInfo: {
      type: Object as PropType<ICompanyInfo>,
      required: true,
    },
  },
  methods: {
    getDate(): string {
      if (this.companyInfo.lastOrder) {
        return moment(this.companyInfo.lastOrder).format("DD/MM/YYYY");
      } else {
        return "Brak";
      }
    },
    removeElement() {
      const remove = async () => {
        await this.$store.dispatch("removeCompany", this.companyInfo.id);
      };
      const data: IPopupConfirmData = {
        remove,
        message: `Czy napewno chcesz usunąć ${this.companyInfo.name}`,
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
