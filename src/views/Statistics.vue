<template>

    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <div class="group">
        <Date :date.sync="time"/>
        <span v-for="total in totalRecordList">总{{ iconType }} : ￥{{total.monthTotal}}</span>
      </div>
      <div class="rank">
        <span>{{ iconType }}排行榜 :</span>

        <ol>
          <li v-for="(tags,index) in chartData" :key="index" class="item">
            <span class="name">{{tags.name}}</span>
            <span class="total">￥{{tags.value}}</span>
          </li>
        </ol>
      </div>


      <Echarts :options="chartOption" v-if="monthRecord.length>0"/>
      <NoRecord v-else/>
    </Layout>

</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
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

  get iconType() {
    const map:any = {
      '-': '支出',
      '+': '收入'
    }
    return map[this.type]
  }

  beforeCreate(){
    this.$store.commit('fetchRecords')
  }

  get recordList(){
    return (this.$store.state as RootState).recordList
  }
  get types(){
    return  this.recordList.filter(t=>t.type === this.type)
  }
  get MonthRecordList(){

    const month=dayjs(this.time).format('YYYY-MM')
    return this.types.filter(t=>dayjs(t.createdAt).format('YYYY-MM') ===month)
  }
  //获取不重复的标签名和 相同标签名的总金额
  get monthRecord (){
    const {MonthRecordList} = this
    const map = new Map()
    for (let i = 0; i < MonthRecordList.length; i++) { //遍历数据
      const tag: string = MonthRecordList[i].tags.name;
      const value: number = MonthRecordList[i].amount;
      if (map.has(tag)) {// 如果map中有这个tag 名称
        const prevValue = map.get(tag); //获取tag的amount值
        const currentValue = prevValue + value; //相加
        map.set(tag, currentValue);
      } else {
        map.set(tag, value);
      }
    }
    return [...map];//循环map

  }
  get chartData(){
    type tag={name:string,value:number}[]

    const list=this.monthRecord.reduce((result, item) => {
          result.push({name: item[0] as string, value: item[1]as number})//0 1 为下标
          return result;
        },
        [] as tag)
    return list.sort((a,b)=>(b.value-a.value))

  }
  //获取收入或者支出类别的总金额
  get totalRecord(){
    const {MonthRecordList} = this
    const map = new Map()
    for (let i = 0; i < MonthRecordList.length; i++) {
      const currentTag: string = MonthRecordList[i].tags.type;
      const value: number = MonthRecordList[i].amount;
      if (map.has(currentTag)) {
        const prevValue = map.get(currentTag);
        const currentValue = prevValue + value;
        map.set(currentTag, currentValue);
      } else {
        map.set(currentTag, value);
      }
    }
    return [...map];
  }
  get totalRecordList(){
    type tag={name:string,monthTotal:number}[]

    return  this.totalRecord.reduce((result, item) => {
          result.push({name: item[0] as string, monthTotal: item[1]as number})//0 1 为下标
          return result;
        },
        [] as tag)

  }






// 造图表
  get chartOption(){

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
          center: ['55%', '55%'],
          data:this.chartData,
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
.rank{
  padding: 0 16px;
}
.group{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #e6e6e6;
}
.item{

  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 15px;
}
</style>

