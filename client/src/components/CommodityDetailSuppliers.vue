<template>
  <div class="detail-commodity__suppliers">
    <h1>Lista dostawców <supplier-blue-icon /></h1>
    <div
      v-if="
        $store.state.commoditiesState.commodityDetail?.suppliers &&
        $store.state.commoditiesState.commodityDetail?.suppliers.length > 0
      "
    >
      <div class="commodity-suppliers__header">
        <div>Nazwa dostawcy</div>
        <div>Detale</div>
      </div>
      <div
        v-for="item in $store.state.commoditiesState.commodityDetail.suppliers"
        :key="item.id"
        class="commodity-suppliers__element"
      >
        <commodity-detail-supplier
          :supplier-item="item"
        ></commodity-detail-supplier>
      </div>
    </div>
    <div v-else class="commodity-suppliers__info">Brak Dostawców</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SupplierBlueIcon from "@/icons/SupplierBlueIcon.vue";
import CommodityDetailSupplier from "@/components/CommodityDetailSupplier.vue";

export default defineComponent({
  components: { SupplierBlueIcon, CommodityDetailSupplier },
});
</script>

<style lang="scss">
.commodity-suppliers {
  overflow-y: auto;
  height: 100%;
  &__header {
    margin: 0.7rem 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    div {
      text-align: center;
      font-weight: 500;
    }
  }
  &__element {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 1.5rem;
    div {
      text-align: center;
    }
  }

  &__info {
    font-size: 1.4rem;
    font-weight: 700;
    text-align: center;
    margin-top: 2rem;
  }
}
</style>
