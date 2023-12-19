<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { getModList, getContentList } from "@/api/emotion/index";
import { ref } from "vue";
defineOptions({
  name: "ServiceEmotions",
});
const data = [
  {
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
  },
  {
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
  },
];
const tableData = ref(data);

onMounted(() => {
  queryModList();
  queryContentList();
});

function queryModList() {
  getModList({}).then(({ data }) => {
    console.log("ModList=>", data);
  });
}
function queryContentList() {
  getContentList({ module: "hsh", content: "" }).then(({ data }) => {
    console.log("contentList=>", data);
  });
}
</script>
