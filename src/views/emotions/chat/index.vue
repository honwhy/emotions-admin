<template>
  <div class="app-container">
    <el-row>
      <el-col :span="18">
        <el-input
          v-model="question"
          :autosize="{ minRows: 5, maxRows: 10 }"
          :input-style="{ fontSize: '18px' }"
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
          :input-style="{ fontSize: '18px' }"
          type="textarea"
          placeholder=""
        />
      </el-col>
      <div class="emojis">
        <span>{{ getScoreEmoji(1) }}</span>
        <span>{{ getScoreEmoji(2) }}</span>
        <span>{{ getScoreEmoji(3) }}</span>
        <span>{{ getScoreEmoji(4) }}</span>
        <span>{{ getScoreEmoji(5) }}</span>
      </div>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { getAnswer } from "@/api/emotion/index";
import type { QaAnswer } from "@/api/emotion/types";
import { getScoreEmoji } from "../helper";
import "twemoji-colr-font/twemoji.css";
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
      answer.value = getScoreEmoji(Math.floor(data.score)) + data.summary;
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
<style scoped>
.emojis {
  font-family: "PingFang SC", "Microsoft YaHei", Twemoji, Arial, Helvetica,
    sans-serif;
}
</style>
