<template>
  <div class="detail-company__info">
    <h1>Informacje o firmie <info-blue-icon /></h1>
    <p>Nazwa: {{ $store.state.companiesState.companyDetail?.name }}</p>
    <p>
      Nip:
      {{ $store.state.companiesState.companyDetail?.nip }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InfoBlueIcon from "@/icons/InfoBlueIcon.vue";

export default defineComponent({ components: { InfoBlueIcon } });
</script>
