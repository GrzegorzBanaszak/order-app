<template>
  <div>{{ companyInfo.name }}</div>
  <div>{{ companyInfo.nip }}</div>
  <div>
    {{ getDate() }}
  </div>
  <div>{{ companyInfo.employers }}</div>
  <div class="list-element__controller">
    <router-link :to="'/d/companies/' + companyInfo.id">
      <info-black-icon />
    </router-link>
    <router-link :to="'/d/companies/edit/' + companyInfo.id">
      <pen-black-icon></pen-black-icon>
    </router-link>
    <trash-black-icon @click="removeElement"></trash-black-icon>
  </div>
</template>

<script lang="ts">
import TrashBlackIcon from "@/icons/TrashBlackIcon.vue";
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";
import PenBlackIcon from "../icons/PenBlackIcon.vue";
import { ICompanyInfo, IPopupConfirmData } from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";

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
      this.$store.commit("displayRemovePopup", data);
    },
  },
});
</script>

<style></style>
