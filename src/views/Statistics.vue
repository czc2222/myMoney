<template>

    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <Date :date.sync="time"/>
      <Echarts :options="x"  v-if="tagName.length>0"/>
      <NoRecord v-else/>
    </Layout>

</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList'
import Echarts from '@/components/Echarts.vue';
import dayjs from 'dayjs';
import Date from '@/components/Date.vue';
import NoRecord from '@/components/NoRecord.vue';



@Component({
  components:{
    NoRecord,
    Date,
    Echarts,
    Tabs
  }})
export default class bill extends Vue {
  type='-'
  recordTypeList=recordTypeList
  time=dayjs()
  @Watch('x')
  onValueChanged(){

  }

  get recordList(){
    return (this.$store.state as RootState).recordList
  }
  get types(){
    return this.recordList.filter(t=>t.type === this.type)
  }
  get month(){
    return dayjs(this.time).format('YYYY-MM')
  }

  get MonthRecordList(){
    return this.types.filter(t=>dayjs(t.createdAt).format('YYYY-MM') ===this.month)
  }
  get tagName (){
    const  {MonthRecordList} =this //获取这个月的数据
    const map = new Map()
    for (let i = 0; i < MonthRecordList.length; i++) { //遍历数据
      const tag: string = MonthRecordList[i].tags.name;
      const value: number = MonthRecordList[i].amount;
      if (map.has(tag)) {// 如果map中有这个tag 名称
        const prevValue = map.get(tag); //获取除tag的amount值
        const currentValue = prevValue + value; //相加
        map.set(tag, currentValue);
      } else {
        map.set(tag, value);
      }
    }
    return [...map];//循环map

  }
  beforeCreate(){
    this.$store.commit('fetchRecords')
  }




  get x(){
    console.log(this.tagName);


    type tag={name:string,value:number}[]

    const chartData = this.tagName.reduce((result, item) => {
          result.push({'name': item[0] as string, 'value': item[1] as number})//0 1 为下标
          return result;
        },
        [] as tag)
    console.log(chartData);
    return {

        tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {

        orient: 'vertical',
        left: 'left',

      },
      series: [
        {
          name: '',
          type: 'pie',

          radius: '50%',
          data:chartData,
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

