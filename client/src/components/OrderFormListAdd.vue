<template>
    <div class="form-list__new">
        <input type="text">
        <input type="text">
        <input type="number" readonly>
        <input type="checkbox">
        <input type="number">
        <input type="number">
        <input type="text">
        <div class="form-list__control">
            <accept-icon></accept-icon>
            <remove-icon @click="$emit('hideForm')"></remove-icon>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import AcceptIcon from "@/icons/AcceptIcon.vue"
import RemoveIcon from "@/icons/RemoveIcon.vue"

export default defineComponent({
    components:{AcceptIcon,RemoveIcon}
});
</script>