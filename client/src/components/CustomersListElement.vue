<template>
  <div>{{ customerInfo.name }}</div>
  <div>{{ customerInfo.companyName }}</div>
  <div>
    {{ getDate() }}
  </div>
  <div>{{ customerInfo.phoneNumber }}</div>
  <div>
    <router-link :to="'/d/customers/' + customerInfo.id"
      ><dotts-icon
    /></router-link>
  </div>
</template>

<script lang="ts">
import { ICustomerInfo } from "@/types";
import moment from "moment";
import { defineComponent, PropType } from "vue";
import DottsIcon from "@/icons/DottsIcon.vue";

export default defineComponent({
  components: { DottsIcon },
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
  },
});
</script>
