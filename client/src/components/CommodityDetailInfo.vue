<template>
  <div class="detail-commodity__info">
    <h1>Informacje o towarze <info-blue-icon /></h1>
    <p>Nazwa: {{ $store.state.commoditiesState.commodityDetail?.name }}</p>
    <p>
      Numer katalogowy:
      {{ $store.state.commoditiesState.commodityDetail?.indexNumber }}
    </p>
    <p>
      Opis: {{ $store.state.commoditiesState.commodityDetail?.description }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InfoBlueIcon from "@/icons/InfoBlueIcon.vue";
export default defineComponent({ components: { InfoBlueIcon } });
</script>
