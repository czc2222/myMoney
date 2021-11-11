<template>
  <div class="wrapper" ref="wrapper">Charts</div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

import * as echarts from 'echarts';
import {EChartsOption, ECharts} from 'echarts';

@Component
export default class Echarts extends Vue {
  @Prop() options?: EChartsOption;
  // chart: ECharts;
  mounted() {
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    chart.setOption(this.options!)
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}
</style>