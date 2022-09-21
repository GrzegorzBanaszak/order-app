<template>
  <div>{{ companyInfo.name }}</div>
  <div>{{ companyInfo.nip }}</div>
  <div>
    {{ getDate() }}
  </div>
  <div>{{ companyInfo.employers }}</div>
  <div>
    <router-link :to="'/d/companies/' + companyInfo.id"
      ><dotts-icon
    /></router-link>
  </div>
</template>

<script lang="ts">
import DottsIcon from "@/icons/DottsIcon.vue";
import { ICompanyInfo } from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  components: { DottsIcon },
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
  },
});
</script>

<style></style>
