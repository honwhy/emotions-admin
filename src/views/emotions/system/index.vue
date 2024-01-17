<template>
  <div class="app-container">
    <EmotionSteps :user-id="''" />
    <el-row :gutter="12" class="thought row">
      <el-col
        :span="5"
        v-for="(item, index) in items"
        :key="item.title"
        :offset="index === 0 ? 2 : 0"
      >
        <PieChart :title="item.title" :data="item.data" />
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import EmotionSteps from "../components/EmotionSteps.vue";
import { getData } from "@/api/emotion/index";
import PieChart from "../components/PieChart.vue";
import { DataObject } from "@/api/emotion/types";
import type { ItemOption } from "../types";
defineOptions({
  name: "SystemEmotions",
});

onMounted(() => {
  queryDataList();
});
const items = ref<ItemOption[]>([]);
function queryDataList() {
  getData({}).then(({ data }) => {
    console.log("getData=>", data);
    items.value = parseData(data);
  });
}
function parseData(data: DataObject): ItemOption[] {
  const pathPv = data["path_pv"];
  const pathUv = data["path_uv"];
  const scorePv = data["score_pv"];
  const scoreUv = data["score_uv"];
  const a1 = Object.keys(pathPv).map((k) => {
    return {
      name: k,
      value: pathPv[k],
    };
  });
  const a2 = Object.keys(pathUv).map((k) => {
    return {
      name: k,
      value: pathUv[k],
    };
  });
  const a3 = Object.keys(scorePv).map((k) => {
    return {
      name: k,
      value: scorePv[k],
    };
  });
  const a4 = Object.keys(scoreUv).map((k) => {
    return {
      name: k,
      value: scoreUv[k],
    };
  });
  return [
    {
      title: "path_pv",
      data: a1,
    },
    {
      title: "path_uv",
      data: a2,
    },
    {
      title: "score_pv",
      data: a3,
    },
    {
      title: "score_uv",
      data: a4,
    },
  ];
}
</script>
<style scoped lang="scss">
.thought {
  margin-top: 32px;

  :deep(.el-col) {
    height: 240px;
  }

  :deep(.el-col .column-content) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

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
</style>
