<template>
  <div class="detail-customer__info">
    <h1>Informacje o kliencie <info-blue-icon /></h1>
    <p>
      Imię: {{ $store.state.customersState.customerDetail?.name.split(" ")[0] }}
    </p>
    <p>
      Nazwisko:
      {{ $store.state.customersState.customerDetail?.name.split(" ")[1] }}
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
