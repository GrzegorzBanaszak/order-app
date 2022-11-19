<template>
  <div class="open-orders__element">
    <div class="open-orders__element--item">
      <p class="open-orders__description">Osoba zamawiająca</p>
      {{ order?.customer }}
    </div>
    <div class="open-orders__element--item">
      <p class="open-orders__description">Data zamówienia</p>
      {{ getDate() }}
    </div>
    <div class="open-orders__element--item">
      <p class="open-orders__description">Ilość</p>
      {{ order?.quantity }}
    </div>
    <div class="open-orders__element--item">
      <p class="open-orders__description">Kwota całkowita</p>
      {{ order?.totalPrice }} zł
    </div>
    <div class="open-orders__element--item">
      <p class="open-orders__description">Data zamówienia</p>
      {{ order?.status }}
    </div>
    <div>
      <router-link class="open-orders__detail" :to="`/d/orders/${order?.id}`">
        <info-black-icon />
        <p>Więcej informacji</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import InfoBlackIcon from "@/icons/InfoBlackIcon.vue";
import { IOrder } from "@/types";
import { defineComponent, PropType } from "vue";
import moment from "moment";

export default defineComponent({
  components: { InfoBlackIcon },
  props: {
    order: {
      type: Object as PropType<IOrder>,
    },
  },
  methods: {
    getDate() {
      return moment(this.order?.createdAt).format("DD/MM/YYYY");
    },
  },
});
</script>

<style lang="scss">
.open-orders {
  &__element {
    margin: 0.7rem 0.3rem;

    &--item {
      display: flex;
      justify-content: space-between;
      margin: 0.5rem 0;
    }
  }
  &__description {
    font-weight: 700;
  }
  &__detail {
    margin: 1rem 0;
    padding: 0.5rem 0;
    border-radius: 10px;
    background-color: #673ab7;
    display: flex;
    justify-content: center;
    color: white;
    gap: 0.5rem;
    font-weight: 700;
    svg {
      display: block;
      fill: white;
    }
  }
}

@include lg {
  .open-orders {
    margin: 0.7rem 0.3rem;
    &__element {
      @include orderGrid;
      &--item {
        display: flex;
        justify-content: center;
      }
    }
    &__description {
      display: none;
    }
    &__detail {
      margin: 0;
    }
  }
}
</style>
