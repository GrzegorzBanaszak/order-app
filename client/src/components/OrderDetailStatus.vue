<template>
  <div class="detail-order__status">
    <h1>
      Status
      <div v-if="isEdit" class="detail-order__edit">
        <accept-icon @click="updateOrderStatus" />
        <remove-icon @click="isEdit = false" />
      </div>
      <div v-else class="detail-order__edit">
        <edit-icon @click="openEdit" />
      </div>
    </h1>
    <p v-if="isEdit">
        <div @click="showDropdown = !showDropdown" class="detail-order__select">
          {{ selectedValue }}
          <div v-if="showDropdown" class="detail-order__select--dropdown">
            <span @click="selectElement(item)" v-for="item in listDropdown">{{ item }}</span>
          </div>
        </div>
        </p>

        <p v-else> {{ $store.state.ordersState.orderDetail?.status }}</p>
  </div>
</template>

<script lang="ts">
import { IStatusUpdate } from "@/types";
import { defineComponent } from "vue";
import EditIcon from "@/icons/EditIcon.vue";
import AcceptIcon from "@/icons/AcceptIcon.vue";
import RemoveIcon from "@/icons/RemoveIcon.vue";

export default defineComponent({
  components: { EditIcon, AcceptIcon, RemoveIcon },
  data() {
    return {
      isEdit: false as boolean,
      selectedValue: "" as string,
      showDropdown: false as boolean,
      listDropdown: ["W przygotowaniu", "Wysłano", "Do odbioru", "Odebrano"],
    };
  },
  methods: {
    selectElement(selectedStatus: string) {
      this.selectedValue = selectedStatus
    },
    openEdit() {
      this.isEdit = true;
      if (this.$store.state.ordersState.orderDetail) {
        this.selectedValue = this.$store.state.ordersState.orderDetail?.status;
      }
    },
    async updateOrderStatus() {
      const data: IStatusUpdate = {
        id: this.$store.state.ordersState.orderDetail?.id!,
        status: this.selectedValue,
      };

      await this.$store.dispatch("updateStatus", data);

      this.isEdit = false;
    },
  },
});
</script>

<style></style>
