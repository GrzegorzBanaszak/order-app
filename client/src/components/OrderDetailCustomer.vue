<template>
  <div class="detail-order__customer">
    <h1>Klient <customers-blue-icon /></h1>
    <div class="detail-order__customer--header">
      <div>Nazwa</div>
      <div>Numer telefonu</div>
      <div>Delate</div>
    </div>
    <div class="detail-order__customer--info">
      <div>{{ $store.state.ordersState.orderDetail?.customer.name }}</div>
      <div>
        {{ $store.state.ordersState.orderDetail?.customer.phoneNumber }}
      </div>
      <div>
        <router-link
          :to="
            '/d/customers/' + $store.state.ordersState.orderDetail?.customer.id
          "
          ><dotts-icon
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomersBlueIcon from "@/icons/CustomersBlueIcon.vue";
import DottsIcon from "@/icons/DottsIcon.vue";
export default defineComponent({
  components: { CustomersBlueIcon, DottsIcon },
});
</script>
