<template>
  <div class="app-container">
    <el-select v-model="userId" class="m-2" placeholder="请选择" size="large">
      <el-option
        v-for="item in userList"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <EmotionSteps />
  </div>
</template>
<script setup lang="ts">
import EmotionSteps from "../components/EmotionSteps.vue";
import { getUserList } from "@/api/emotion/index";
import { onMounted, ref } from "vue";

defineOptions({
  name: "UserEmotions",
});
onMounted(() => {
  queryUserList();
});

const userId = ref("");
const userList = ref<string[]>([]);
function queryUserList() {
  getUserList({}).then(({ data }) => {
    userList.value = data;
  });
}
</script>
