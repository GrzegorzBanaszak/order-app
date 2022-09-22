<template>
  <div class="detail-supplier__info">
    <h1>Informacje o dostawcy <info-blue-icon /></h1>
    <p>Nazwa: {{ $store.state.suppliersState.supplierDetail?.name }}</p>
    <p>
      Cena dostawy:
      {{ $store.state.suppliersState.supplierDetail?.price }} zł
    </p>
  </div>
</template>

<script lang="ts">
import InfoBlueIcon from "@/icons/InfoBlueIcon.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { InfoBlueIcon },
});
</script>
