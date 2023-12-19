<template>
  <div class="app-container">
    <EmotionSteps :user-id="''" />
  </div>
</template>
<script setup lang="ts">
import EmotionSteps from "../components/EmotionSteps.vue";
defineOptions({
  name: "SystemEmotions",
});
</script>
