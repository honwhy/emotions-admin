<template>
  <div class="app-container">
    <EmotionSteps :user-id="''" />
    <el-row :gutter="12" class="thought row">
      <el-col :span="4">
        <div class="column-content column-first">
          <div class="thought-titles">
            <!--
            <div class="top">想法</div>
            -->
            <div class="bottom">数据统计</div>
          </div>
        </div>
      </el-col>
      <el-col :span="18"> 饼图 </el-col>
    </el-row>
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
