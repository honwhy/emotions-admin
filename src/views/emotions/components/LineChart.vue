<template>
  <v-chart :option="option" />
</template>
<script setup lang="ts">
import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { ComposeOption } from "echarts/core";
import type { LineSeriesOption } from "echarts/charts";
import type {
  GridComponentOption,
  TooltipComponentOption,
} from "echarts/components";

use([GridComponent, TooltipComponent, LineChart, CanvasRenderer]);

type EChartsOption = ComposeOption<
  GridComponentOption | TooltipComponentOption | LineSeriesOption
>;

import VChart from "vue-echarts";
import { ref } from "vue";

use([GridComponent, LineChart, CanvasRenderer]);
// https://stackblitz.com/edit/vue-echarts-vue-3?file=src%2FApp.vue
const option = ref<EChartsOption>({
  grid: {
    // 让图表占满容器
    top: "68px",
    left: "8px",
    right: "8px",
    bottom: "0px",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [1, 2, 3, 4, 5, 6],
    show: false,
  },
  yAxis: {
    type: "value",
    show: false,
  },
  tooltip: {
    show: true,
    trigger: "item",
    alwaysShowContent: true,
    position: function (point, params, dom, rect, size) {
      // 固定在顶部
      return [point[0], "10%"];
    },
  },
  series: [
    {
      data: [1, 3, 2, 3, 3, 5, 4],
      type: "line",
      lineStyle: {
        color: "#edf0ff",
      },
      areaStyle: {
        color: "#edf0ff",
      },
      label: {
        show: true,
        position: "inside",
        formatter: ({ data }) => {
          switch (data) {
            case 1:
              return `😁`;
            case 2:
              return `😊`;
            case 3:
              return `🙂`;
            case 4:
              return `😶`;
            case 5:
              return `🙄`;
          }
          return `🙄`;
        },
      },
    },
  ],
});
</script>
