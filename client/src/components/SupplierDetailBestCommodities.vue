<template>
  <div class="detail-supplier__popular">
    <h1>Najczęściej zamawiane <package-blue-icon /></h1>
    <div
      v-if="
        $store.state.suppliersState.supplierDetail &&
        $store.state.suppliersState.supplierDetail.bestOrderCommodities.length >
          0
      "
      class="supplier-best"
    >
      <div class="supplier-best__header">
        <div>Nazwa towaru</div>
        <div>Ilość</div>
        <div>Ostatnia cena</div>
        <div>Detale</div>
      </div>
      <div class="supplier-best__container">
        <div
          v-for="item in $store.state.suppliersState.supplierDetail
            .bestOrderCommodities"
          :key="item.id"
          class="supplier-best__element"
        >
          <supplier-detail-best-commodity
            :commodity-data="item"
          ></supplier-detail-best-commodity>
        </div>
      </div>
    </div>
    <div v-else class="supplier-best__info">Brak towarów</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PackageBlueIcon from "@/icons/PackageBlueIcon.vue";
import SupplierDetailBestCommodity from "./SupplierDetailBestCommodity.vue";

export default defineComponent({
  components: { PackageBlueIcon, SupplierDetailBestCommodity },
});
</script>

<style lang="scss">
.supplier-best {
  padding: 0 0.4rem 1rem 0.4rem;
  height: 100%;
  &__container {
    overflow-y: auto;
    height: 80%;
    @include scrollbars(5px, #ccc, white);
  }
  &__header {
    margin: 0.4rem 0;
    font-size: 0.8rem;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    div {
      text-align: center;
      font-weight: 500;
    }
  }

  &__element {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    margin: 0.4rem 0;
    font-size: 0.8rem;
    div {
      text-align: center;
    }
  }

  &__info {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-top: 1rem;
  }
}
</style>
