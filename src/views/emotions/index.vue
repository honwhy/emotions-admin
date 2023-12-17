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
    <el-row :gutter="12" class="target row">
      <el-col :span="4">
        <div class="column-content column-first">用户目标</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">了解丁香的口碑、服务</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">看科室</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">看医生</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">问诊</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">查看结果</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">开药</div>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="act row">
      <el-col :span="4">
        <div class="column-content column-first">行为</div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">
          <ul>
            <li>同类产品对比</li>
            <li>问中医同学咨询</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">
          <ul>
            <li>挂号</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">
          <ul>
            <li>选医生描述病症</li>
            <li>搜索病症对应的解决方案</li>
            <li>查看价格</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">
          <ul>
            <li>向医生描述病症</li>
            <li>提供图片</li>
            <li>电话</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">
          <ul>
            <li>线上查看</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="column-content">
          <ul>
            <li>查看处方</li>
            <li>线上购药</li>
          </ul>
        </div>
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
import LineChart from "./components/LineChart.vue";
defineOptions({
  name: "Emotions",
});
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
