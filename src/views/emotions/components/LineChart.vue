<template>
  <v-chart
    id="v-chart"
    ref="instance"
    :option="options"
    class="v-charts"
    @selectchanged="handleSelect"
    @rendered="handleFinished"
  />
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
import { debounce } from "lodash-es";
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
import { ref, computed, nextTick } from "vue";
import { ExperienceItem } from "@/api/emotion/types";
import { pushContent } from "@/api/emotion/index";
import { getScoreEmoji } from "../helper";

use([GridComponent, LineChart, CanvasRenderer]);
interface Props {
  list: ExperienceItem[];
  isUser: boolean;
}
const props = defineProps<Props>();
// https://stackblitz.com/edit/vue-echarts-vue-3?file=src%2FApp.vue
const ydata = computed(() => {
  let temp = props.list.map((it) => it.score);
  const head = temp[0];
  const tail = temp[temp.length - 1];
  temp.push(tail);
  temp.unshift(head);
  return temp;
});
const options = computed<EChartsOption>(() => ({
  grid: {
    // 让图表占满容器
    top: "60px",
    left: "0px",
    right: "0px",
    bottom: "0px",
    show: true,
    borderColor: "#ccc",
    shadowBlur: 0,
  },
  xAxis: {
    type: "category",
    data: [0, 1, 2, 3, 4, 5, 6, 7],
    show: true,
    boundaryGap: false,
    axisPointer: {
      value: 0,
      z: 1,
      snap: true,
      lineStyle: {
        color: "#7581BD",
        width: 2,
      },
      label: {
        show: false,
      },
      handle: {
        show: props.isUser,
        size: 20,
      },
      triggerTooltip: false,
    },
  },
  yAxis: {
    type: "value",
    show: false,
    max: 5.5,
  },
  tooltip: {
    show: props.isUser,
    trigger: "item",
    alwaysShowContent: true,
    confine: true,
    position: function (point, params, dom, rect, size) {
      // 固定在顶部
      // console.log('position.dom', dom);
      return [point[0] - rect!.width, 5];
    },
    formatter: (params: any) => {
      // console.log("tooltip formatter. params", params);
      if (params.dataIndex === 0 || params.dataIndex == 7) {
        return "";
      }
      return props.list[params.dataIndex - 1].summary;
    },
    enterable: true,
    extraCssText: "z-index: 100",
  },
  series: [
    {
      data: ydata.value,
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
        fontSize: 18,
        formatter: ({ data, dataIndex }) => {
          if (dataIndex === 0 || dataIndex === 7) {
            return "-";
          }
          return getScoreEmoji(data as number);
        },
      },
      endLabel: {
        show: false,
        height: 0,
        width: 0,
      },
    },
  ],
}));
function handleSelect(arg: { fromActionPayload: { dataIndexInside: number } }) {
  const params = arg.fromActionPayload;
  console.log("handleSelect", params);
  if (
    params.dataIndexInside === 0 ||
    params.dataIndexInside === 7 ||
    !props.isUser
  ) {
    return;
  }
  ElMessageBox.confirm("是否确认推送数据到业务系统", "提示", {
    appendTo: "body",
    customStyle: {
      zIndex: 9999,
    },
  })
    .then(() => {
      console.log("确认处理的逻辑");
      const content = props.list[params.dataIndexInside - 1];
      const p = {
        module: content.module,
        content,
      };
      pushContent(p).then(({ data }) => {
        ElMessage({
          message: "推送成功",
          type: "success",
        });
      });
    })
    .catch(() => {});
}
const instance = ref<InstanceType<typeof VChart>>();
const loading = ref(false);
const handleFinished = debounce(() => {
  loading.value = true;
  console.log("handleFinished");
  console.log("instance", instance.value?.chart);
  nextTick(() => {
    instance.value?.chart?.dispatchAction({
      type: "showTip",
      dataIndex: 1,
    });
    loading.value = false;
  });
});
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
</script>
