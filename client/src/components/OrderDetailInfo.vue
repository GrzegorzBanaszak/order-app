<template>
  <div class="detail-order__info">
    <h1>Informacje o dostawie
      <info-blue-icon />
    </h1>
    <div class="detail-order__information">
      <div>
        <p>
          Numer:
          {{ $store.state.ordersState.orderDetail?.orderNumber }}
        </p>
        <p>
          Data:
          {{ getDate() }}
        </p>
        <p>Status: {{ $store.state.ordersState.orderDetail?.status }}</p>
      </div>
      <div>
        <p>
          Kwota:
          {{
          $store.state.ordersState.orderDetail?.commodities.reduce(
          (prev, curr) => (prev += curr.price * curr.quantity),
          0
          )
          }}
          zł
        </p>
        <p>Zaliczka: {{ $store.state.ordersState.orderDetail?.advance }} zł</p>
        <p>Pozostało do zapłaty: {{ toPay() }} zł</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InfoBlueIcon from "@/icons/InfoBlueIcon.vue";
import moment from "moment";

export default defineComponent({
  components: { InfoBlueIcon },
  methods: {
    toPay(): number {
      if (this.$store.state.ordersState.orderDetail) {
        const commoditiesSum =
          this.$store.state.ordersState.orderDetail.commodities.reduce(
            (prev, curr) => (prev += curr.price * curr.quantity),
            0
          );

        return (
          commoditiesSum - this.$store.state.ordersState.orderDetail.advance
        );
      } else {
        return 0;
      }
    },
    getDate(): string {
      return moment(
        this.$store.state.ordersState.orderDetail?.createdAt
      ).format("DD/MM/YYYY");
    },
  },
});
</script>
