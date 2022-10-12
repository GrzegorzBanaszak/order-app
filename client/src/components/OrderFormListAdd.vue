<template>
  <div class="form-list__new">
    <input type="text" />
    <order-form-list-select type-value="text"></order-form-list-select>
    <input type="number" readonly />
    <input type="checkbox" />
    <input type="number" />
    <input type="number" />
    <input type="text" />
    <div class="form-list__control">
      <accept-icon></accept-icon>
      <remove-icon @click="$emit('hideForm')"></remove-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AcceptIcon from "@/icons/AcceptIcon.vue";
import RemoveIcon from "@/icons/RemoveIcon.vue";
import OrderFormListSelect from "@/components/OrderFormListSelect.vue"

export default defineComponent({
  components: { AcceptIcon, RemoveIcon,OrderFormListSelect },
 
});
</script>
