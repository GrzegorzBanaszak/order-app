<template>
  <div>{{ commodityInfo.name }}</div>
  <div>{{ commodityInfo.lastPrice }} zł</div>
  <div>
    {{ getDate() }}
  </div>
  <div class="list-element__controller">
    <router-link :to="'/d/commodities/' + commodityInfo.id">
      <info-black-icon />
    </router-link>
    <router-link :to="'/d/commodities/edit/' + commodityInfo.id">
      <pen-black-icon></pen-black-icon>
    </router-link>
    <trash-black-icon @click="removeElement"></trash-black-icon>
  </div>
</template>

<script lang="ts">
import TrashBlackIcon from "@/icons/TrashBlackIcon.vue";
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";
import PenBlackIcon from "../icons/PenBlackIcon.vue";
import { ICommodityInfo, IPopupConfirmData } from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";

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
       message:`Czy napewno chcesz usunąć ${this.commodityInfo.name}`,
      };
      this.$store.commit("displayRemovePopup", data);
    },
  },
});
</script>
