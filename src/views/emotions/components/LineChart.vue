<template>
  <v-chart :option="option" />
</template>
<script setup lang="ts">
import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";
import { ref } from "vue";

use([GridComponent, LineChart, CanvasRenderer]);
// https://stackblitz.com/edit/vue-echarts-vue-3?file=src%2FApp.vue
const option = ref({
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      lineStyle: {
        color: "#edf0ff",
      },
      areaStyle: {
        color: "#edf0ff",
      },
    },
  ],
});
</script>
