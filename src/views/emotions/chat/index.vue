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
        <div style="margin: 20px 0; text-align: right">
          <el-button
            type="primary"
            @click="onQuery"
            :disabled="question === ''"
            :loading="loading"
            >提交</el-button
          >
        </div>
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
import { getAnswer } from "@/api/emotion/index";
import type { QaAnswer } from "@/api/emotion/types";
defineOptions({
  name: "ChatEmotions",
});
const question = ref("");
const answer = ref("");
const loading = ref(false);
function onQuery() {
  loading.value = true;
  getAnswer({ content: question.value })
    .then(({ data }) => {
      answer.value = data.summary;
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
