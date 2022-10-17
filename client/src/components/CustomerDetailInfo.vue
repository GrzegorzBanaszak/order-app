<template>
  <div class="detail-customer__info">
    <h1>Informacje o kliencie <info-blue-icon /></h1>
    <p>
      Imię i nazwisko: {{ $store.state.customersState.customerDetail?.name }}
    </p>
    <p>
      Numer telefonu:
      {{ $store.state.customersState.customerDetail?.phoneNumber }}
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
