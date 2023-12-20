<template>
  <v-chart ref="instance" :option="option" />
</template>
<script setup lang="ts">
import { use } from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { ComposeOption } from "echarts/core";
import type { LineSeriesOption } from "echarts/charts";
import type {
  GridComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
} from "echarts/components";

use([
  GridComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
]);

type EChartsOption = ComposeOption<
  | GridComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | LineSeriesOption
>;

import VChart from "vue-echarts";
import { ref } from "vue";

use([GridComponent, LineChart, CanvasRenderer]);
// https://stackblitz.com/edit/vue-echarts-vue-3?file=src%2FApp.vue
const option = ref<EChartsOption>({
  grid: {
    // 让图表占满容器
    top: "68px",
    left: "0px",
    right: "0px",
    bottom: "0px",
    show: true,
    borderColor: "#ccc",
    shadowBlur: 0,
  },
  legend: {
    top: 20,
  },
  xAxis: {
    type: "category",
    data: [0, 1, 2, 3, 4, 5, 6, 7],
    show: false,
    boundaryGap: false,
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
      data: [1, 1, 3, 2, 3, 5, 4, 4],
      type: "line",
      smooth: true,
      lineStyle: {
        color: "#edf0ff",
      },
      areaStyle: {
        color: "#bbbee5",
      },
      label: {
        show: true,
        position: "inside",
        formatter: ({ data, dataIndex }) => {
          if (dataIndex === 0 || dataIndex === 7) {
            return "";
          }
          switch (data) {
            case 1:
              return `🙄`;
            case 2:
              return `😶`;
            case 3:
              return `🙂`;
            case 4:
              return `😊`;
            case 5:
              return `😁`;
          }
          return `😁`;
        },
      },
      endLabel: {
        show: false,
        height: 0,
        width: 0,
      },
    },
  ],
});
const instance = ref();
console.log("instance", instance);
</script>
