<template>
  <div class="app-container">
    <el-form :model="form" label-width="auto" inline label-position="left">
      <el-form-item label="模块">
        <el-select v-model="form.module" placeholder="请选择模块">
          <el-option
            v-for="item in modList"
            :label="item.moduleName"
            :value="item.module"
            :key="item.module"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryContentList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="record_id" label="记录ID" width="180" />
      <el-table-column prop="user_id" label="用户ID" width="180" />
      <el-table-column prop="module" label="模块" :formatter="formatModule" />
      <el-table-column prop="flow_path" label="阶段" />
      <el-table-column prop="scene" label="接触点" />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="summary" label="摘要" />
      <el-table-column prop="score" label="情绪" :formatter="formatter" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { getModList, getContentList } from "@/api/emotion/index";
import { ref, reactive } from "vue";
import { getScoreEmoji } from "../helper";
import { ExperienceItem, ModuleInfo } from "@/api/emotion/types";
defineOptions({
  name: "ServiceEmotions",
});
const form = reactive({
  module: "",
});
// const data = [
//   {
//     date: "2016-05-02",
//     name: "王小虎",
//     address: "上海市普陀区金沙江路 1518 弄",
//   },
//   {
//     date: "2016-05-04",
//     name: "王小虎",
//     address: "上海市普陀区金沙江路 1517 弄",
//   },
//   {
//     date: "2016-05-01",
//     name: "王小虎",
//     address: "上海市普陀区金沙江路 1519 弄",
//   },
//   {
//     date: "2016-05-03",
//     name: "王小虎",
//     address: "上海市普陀区金沙江路 1516 弄",
//   },
// ];
const tableData = ref<ExperienceItem[]>();

onMounted(() => {
  queryModList();
  queryContentList();
});
const modList = ref<ModuleInfo[]>([]);
function queryModList() {
  getModList({}).then(({ data }) => {
    console.log("ModList=>", data);
    modList.value = data;
  });
}
function queryContentList() {
  getContentList({ module: form.module, content: "" }).then(({ data }) => {
    console.log("contentList=>", data);
    tableData.value = data;
  });
}
function formatter(row: any, column: any, cellValue: number, index: any) {
  return getScoreEmoji(cellValue as number);
}
function formatModule(row: any, column: any, cellValue: string, index: any) {
  return modList.value.find((it) => it.module === cellValue)?.moduleName;
}
</script>
