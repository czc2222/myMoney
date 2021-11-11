<template>
  <div>

    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <Echarts :options="x"  />
    </Layout>

  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList'
import * as echarts from 'echarts';
import Echarts from '@/components/Echarts.vue';


@Component({
  components:{
    Echarts,
    Tabs
  }})
export default class bill extends Vue {
  type='-'
  recordTypeList=recordTypeList

  get x(){
    return {  tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '50%',
          data: [
            {
              value: 335,
              name: '直接访问'
            },
            {
              value: 234,
              name: '联盟广告'
            },
            {
              value: 1548,
              name: '搜索引擎'
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
  }
}
}
</script>

<style lang="scss" scoped>

</style>

