<template>
  <div class="app-container">
    <el-row>
      <el-col :span="18">
        <el-input
          v-model="question"
          :autosize="{ minRows: 5, maxRows: 10 }"
          type="textarea"
          placeholder="请输入"
        />
        <div style="margin: 20px 0"></div>
        <el-input
          v-model="answer"
          :autosize="{ minRows: 5, maxRows: 10 }"
          type="textarea"
          placeholder=""
        />
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
defineOptions({
  name: "ChatEmotions",
});
const question = ref("");
const answer = ref("");
</script>
