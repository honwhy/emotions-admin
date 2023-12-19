<template>
  <div class="app-container">
    <el-row :gutter="12" class="step row">
      <el-col :span="4">
        <div class="column-first column-content">阶段</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content arrow-right">第一步</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">第二步</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">第三步</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">第四步</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">第五步</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">第六步</div>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="touch row">
      <el-col :span="4">
        <div class="column-content column-first">接触点</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">
          <div>
            <div>微信小程序，应用市场</div>
            <div>群聊</div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">
          <div>
            <div>搜索，首页的科室</div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">
          <div>
            <div>问诊，只接搜索</div>
            <div>网上搜索，向中医同学间咨询</div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">
          <div>
            <div>跟医生互动</div>
            <div>在线提供图文</div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">
          <div>
            <div>在丁香医生小程序查看</div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">
          <div>
            <div>根据我的处方进行药物购买</div>
            <div>线上查看</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="thought row">
      <el-col :span="4">
        <div class="column-content column-first">
          <div class="thought-titles">
            <div class="top">想法</div>
            <div class="bottom">情绪曲线</div>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <LineChart />
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { ExperienceItem } from "@/api/emotion/types";
import { getUserContent } from "@/api/emotion/index";
import { onMounted, ref, watch } from "vue";

interface Props {
  userId: string;
}
const props = defineProps<Props>();
onMounted(() => {
  handleQuery();
});
const loading = ref(false);
const pageData = ref<ExperienceItem[]>([]);
function handleQuery() {
  loading.value = true;
  getUserContent({ user_id: props.userId })
    .then(({ data }) => {
      pageData.value = data;
    })
    .finally(() => {
      loading.value = false;
    });
}
watch(
  () => props.userId,
  () => {
    handleQuery();
  }
);
</script>
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
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .top {
      height: 40%;
    }
  }
}
</style>
