<template>
  <div class="app-container">
    <el-row :gutter="12">
      <el-col :span="3">
        <el-select
          v-model="userId"
          class="m-2"
          placeholder="请选择"
          size="large"
          :default-first-option="true"
          :filterable="true"
          style="margin: 0"
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
      <el-col v-for="(item, index) in flowPathList" :key="item" :span="3">
        <div
          class="column-content"
          :class="{ active: activeIndex === index }"
          @click="activeIndex = index"
        >
          {{ item }}
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="emojis">
      <el-col :span="9" style="height: 559px">
        <el-image
          style="
            width: 100%;
            height: 100%;
            border-radius: 4px;
            box-shadow: 0 0 0 1px
              var(--el-input-border-color, var(--el-border-color)) inset;
          "
          :src="imageList[activeIndex]"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[imageList[activeIndex]]"
          fit="contain"
        />
      </el-col>
      <el-col :span="9">
        <el-input
          v-model="answer"
          :autosize="{ minRows: 15, maxRows: 15 }"
          :input-style="{
            fontSize: '18px',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }"
          type="textarea"
          :placeholder="thinking"
          readonly
        />
        <!-- <div style="margin: 20px 0; text-align: right">
          <el-button type="primary" @click="onQuery" :disabled="question === ''" :loading="loading">提交</el-button>
        </div> -->
        <div class="dialog-input">
          <el-input
            v-model="question"
            :autosize="{ minRows: 5, maxRows: 10 }"
            :input-style="{
              fontSize: '18px',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }"
            type="textarea"
            placeholder="请输入"
          />
          <el-button
            class="send-button"
            type="primary"
            @click="onQuery"
            :disabled="question === ''"
            :loading="loading"
            :icon="ChatLineSquare"
            >提交</el-button
          >
        </div>
      </el-col>
      <div class="emojis">
        <span>
          <el-icon
            ref="iconRef"
            v-click-outside="onClickOutside"
            :size="18"
            :color="'#939c9e'"
            style="cursor: pointer"
          >
            <QuestionFilled />
          </el-icon>
        </span>
        <el-popover
          ref="popoverRef"
          :virtual-ref="iconRef"
          trigger="click"
          title="Prompt"
          virtual-triggering
          :width="450"
          placement="left-end"
          teleported
          :popper-style="'white-space: pre-wrap;height:500px;'"
        >
          <el-scrollbar
            max-height="460px"
            :view-style="'max-height: 440px;overflow:auto;'"
            view-class="prompt-text-content"
          >
            {{ promptText }}
          </el-scrollbar>
        </el-popover>
        <div style="color: #939c9e">
          <span>{{ getScoreEmoji(1) }} —— 重度负面</span><br />
          <span>{{ getScoreEmoji(2) }} —— 负面</span><br />
          <span>{{ getScoreEmoji(3) }} —— 中性</span><br />
          <span>{{ getScoreEmoji(4) }} —— 正面</span><br />
          <span>{{ getScoreEmoji(5) }} —— 积极</span>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { ref, unref } from "vue";
import { getAnswer, getUserList, getFlowPathList } from "@/api/emotion/index";
import type { QaAnswer } from "@/api/emotion/types";
import { getScoreEmoji } from "../helper";
import "twemoji-colr-font/twemoji.css";
import img1 from "@/assets/images/phone_dial.jpg";
import img2 from "@/assets/images/service.jpg";
import img3 from "@/assets/images/pay.jpg";
import img4 from "@/assets/images/usage.jpg";
import img5 from "@/assets/images/claim.jpg";
import img6 from "@/assets/images/comment.jpg";
import { QuestionFilled, ChatLineSquare } from "@element-plus/icons-vue";
import promptText from "@/assets/prompt.txt?raw";
import { ClickOutside as vClickOutside } from "element-plus";

defineOptions({
  name: "ChatEmotions",
});
const question = ref("");
const answer = ref("");
const loading = ref(false);
function onQuery() {
  loading.value = true;
  thinking.value = "思考中...";
  onThinking();
  getAnswer({
    content: question.value,
    flow_path: flowPathList.value[activeIndex.value],
    user_id: userId.value,
    scene: "意见反馈",
  })
    .then(({ data }) => {
      const something = data.summary;
      showAnswer(getScoreEmoji(Math.floor(data.score)), something);
    })
    .finally(() => {
      loading.value = false;
    });
}
onMounted(() => {
  queryUserList();
  queryFlowPathList();
});
const thinking = ref("提交输入后将展示摘要及情绪");
const userId = ref("");
const userList = ref<string[]>([]);
function queryUserList() {
  getUserList({}).then(({ data }) => {
    userList.value = data;
    userId.value = userList.value[0];
  });
}
const flowPathList = ref<string[]>([]);
function queryFlowPathList() {
  getFlowPathList({}).then(({ data }) => {
    flowPathList.value = data;
  });
}
const activeIndex = ref(0);
const imageList = [img1, img2, img3, img4, img5, img6];

let timer1 = null;
function onThinking() {
  timer1 = setInterval(() => {
    if (thinking.value === "思考中") {
      thinking.value = "思考中.";
    } else if (thinking.value === "思考中.") {
      thinking.value = "思考中..";
    } else if (thinking.value === "思考中..") {
      thinking.value = "思考中...";
    } else {
      thinking.value = "思考中";
    }
  }, 16 * 20);
}
function showAnswer(emoji: string, something: string) {
  answer.value = emoji;
  const array = something.split("");
  repeat(0, array);
}
function repeat(index: number, array: string[]) {
  setTimeout(() => {
    if (index < array.length) {
      answer.value += array[index];
      repeat(index + 1, array);
    }
  }, 16 * 10);
}
const iconRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};

onUnmounted(() => {
  timer1 = null;
});
</script>
<style scoped lang="scss">
.emojis {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, Twemoji, sans-serif;
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
      cursor: pointer;
      background: #939c9e;
    }

    .active {
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

.send-button {
  position: relative;
  bottom: 34px;
  left: calc(100% - 82px);
}
</style>
<style lang="scss">
.prompt-text-content {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
