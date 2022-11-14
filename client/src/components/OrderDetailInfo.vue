<template>
  <div class="detail-order__info">
    <h1>Informacje o dostawie
      <info-blue-icon />
      <div v-if="isEdit" class="detail-order__edit">
        <accept-icon @click="updateOrderStatus" />
        <remove-icon @click="isEdit = false" />
      </div>
      <div v-else class="detail-order__edit">
        <edit-icon @click="openEdit" />
      </div>
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
        <p v-if="isEdit">
          Status:
        <div @click="showDropdown = !showDropdown" class="detail-order__status">
          {{ selectedValue }}
          <div v-if="showDropdown" class="detail-order__status--dropdown">
            <span @click="selectElement(item)" v-for="item in listDropdown">{{ item }}</span>
          </div>
        </div>
        </p>

        <p v-else>Status: {{ $store.state.ordersState.orderDetail?.status }}</p>
      </div>
      <div>
        <p>
          Kwota:
          {{
          $store.state.ordersState.orderDetail?.commodities.reduce(
          (prev, curr) => (prev += curr.price * curr.quantity),
          0
          ).toFixed(2)
          }}
          zł
        </p>
        <p>Zaliczka: {{ $store.state.ordersState.orderDetail?.advance }} zł</p>
        <p>Pozostało do zapłaty: {{ toPay().toFixed(2) }} zł</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InfoBlueIcon from "@/icons/InfoBlueIcon.vue";
import EditIcon from "@/icons/EditIcon.vue";
import AcceptIcon from "@/icons/AcceptIcon.vue";
import RemoveIcon from "@/icons/RemoveIcon.vue";
import moment from "moment";
import { IStatusUpdate } from "@/types";

export default defineComponent({
  components: { InfoBlueIcon, EditIcon, AcceptIcon, RemoveIcon },
  data() {
    return {
      isEdit: false as boolean,
      selectedValue: "" as string,
      showDropdown: false as boolean,
      listDropdown: [
        'W przygotowaniu',
        'Wysłano',
        'Do odbioru',
        'Odebrano',
      ]
    }
  },
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
    selectElement(selectedStatus: string) {
      this.selectedValue = selectedStatus
    },
    openEdit() {
      this.isEdit = true;
      if (this.$store.state.ordersState.orderDetail) {
        this.selectedValue = this.$store.state.ordersState.orderDetail?.status
      }
    },
    async updateOrderStatus() {

      const data: IStatusUpdate = { id: this.$store.state.ordersState.orderDetail?.id!, status: this.selectedValue }

      await this.$store.dispatch("updateStatus", data)

      this.isEdit = false
    }
  },
});
</script>
