<template>
  <div class="app-container">
    <EmotionSteps :user-id="''" />
  </div>
</template>
<script setup lang="ts">
import EmotionSteps from "../components/EmotionSteps.vue";
import { getData } from "@/api/emotion/index";
defineOptions({
  name: "SystemEmotions",
});

onMounted(() => {
  queryDataList();
});
function queryDataList() {
  getData({}).then(({ data }) => {
    console.log("getData=>", data);
  });
}
</script>
