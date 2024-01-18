<template>
  <v-chart
    style="min-width: 280px"
    id="v-chart"
    ref="instance"
    :option="options"
    class="v-charts"
    :autoresize="true"
  />
</template>
<script setup lang="ts">
import type { PieSeriesOption } from "echarts/charts";
import { PieChart } from "echarts/charts";
import type {
  GridComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
} from "echarts/components";
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import type { ComposeOption } from "echarts/core";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
]);
type EChartsOption = ComposeOption<
  | GridComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;

import { computed } from "vue";
import VChart from "vue-echarts";
import type { ItemOption } from "../types";

const props = defineProps<ItemOption>();

const options = computed<EChartsOption>(() => ({
  title: {
    text: props.title,
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    show: false,
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: props.title,
      type: "pie",
      radius: "50%",
      data: props.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
}));
</script>
