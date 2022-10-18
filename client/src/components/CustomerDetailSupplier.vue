<template>
  <div
    v-if="$store.state.customersState.customerDetail?.company"
    class="detail-customer__supplier"
  >
    <h1>Firma <company-blue-icon /></h1>
    <p>Nazwa: {{ $store.state.customersState.customerDetail?.company.name }}</p>
    <p>
      Nip:
      {{ $store.state.customersState.customerDetail?.company.nip }}
    </p>
  </div>
  <div v-else class="detail-customer__supplier">
    <h1>Firma <company-blue-icon /></h1>
    <b>Brak Firmy</b>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CompanyBlueIcon from "@/icons/CompanyBlueIcon.vue";
export default defineComponent({
  components: { CompanyBlueIcon },
});
</script>

