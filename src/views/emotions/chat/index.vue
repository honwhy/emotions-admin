<template>
  <div class="app-container">
    <el-row :gutter="12">
      <el-col :span="3">
        <el-select
          v-model="userId"
          class="m-2"
          placeholder="请选择"
          size="large"
          default-first-option
        >
          <el-option
            v-for="item in userList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="step row">
      <el-col v-for="item in flowPathList" :key="item" :span="3">
        <div class="column-content">
          {{ item }}
        </div>
      </el-col>
    </el-row>
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
import { getAnswer, getUserList, getFlowPathList } from "@/api/emotion/index";
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
onMounted(() => {
  queryUserList();
  queryFlowPathList();
});
const userId = ref("");
const userList = ref<string[]>([]);
function queryUserList() {
  getUserList({}).then(({ data }) => {
    userList.value = data;
  });
}
const flowPathList = ref<string[]>([]);
function queryFlowPathList() {
  getFlowPathList({}).then(({ data }) => {
    flowPathList.value = data;
  });
}
</script>
<style scoped>
.emojis {
  font-family: "PingFang SC", "Microsoft YaHei", Twemoji, Arial, Helvetica,
    sans-serif;
}
</style>
<style scoped lang="scss">
.el-row:not(:first-child) {
  margin-top: 16px;
}

.step,
.target,
.touch {
  :deep(.el-col) {
    height: 75px;
  }
}

.step,
.target,
.act,
.touch,
.thought {
  :deep(.el-col .column-content) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}

.el-col {
  .column-content {
    font-size: 14px;
    color: #6a6a6c;

    li {
      list-style: disc;
    }
  }
}

.step {
  .el-col {
    .column-content {
      font-weight: 500;
      color: #fff;
      background: #303435;
    }

    .column-first {
      font-weight: 500;
      color: #fff;
      background: #8e95fd;
    }

    // .arrow-right {
    //   &:after {
    //     content: " ";
    //     width: 0;
    //     height: 0;
    //     border-width: 32px;
    //     border-style: solid;
    //     border-color: transparent transparent transparent #303435;
    //     position: relative;
    //     right: -32px;
    //   }
    // }
  }
}

.target,
.act,
.touch,
.thought {
  .el-col {
    .column-content {
      background: #e4e6e8;
    }

    .column-first {
      font-weight: 500;
      color: #fff;
      background: #8e95fd;
    }
  }
}

.act {
  :deep(.el-col) {
    height: 180px;
  }
}

.thought {
  :deep(.el-col) {
    height: 240px;
  }

  .thought-titles {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    .top,
    .bottom {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .top {
      height: 30%;
    }

    .bottom {
      flex: 1;
    }
  }
}
</style>
