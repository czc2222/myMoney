<template>
  <div class="wrapper" ref="wrapper">Charts</div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

import * as echarts from 'echarts';
import {EChartsOption, ECharts} from 'echarts';

@Component
export default class Echarts extends Vue {
  @Prop() options?: EChartsOption;
  chart?: ECharts;
  mounted() {
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options!)

  }
  @Watch('options')
  onOptionsChanged(newValue:any) {
    this.chart!.setOption(newValue);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}
</style>