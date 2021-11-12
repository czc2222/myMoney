<template>
  <div>

    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <Date :date.sync="time"/>

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
import _ from 'lodash'
import dayjs from 'dayjs';
import Date from '@/components/Date.vue';


@Component({
  components:{
    Date,
    Echarts,
    Tabs
  }})
export default class bill extends Vue {
  type='-'
  recordTypeList=recordTypeList
  time=dayjs()
  get recordList(){
    return (this.$store.state as RootState).recordList
  }
  get month(){
    return dayjs(this.time).format('YYYY-MM')
  }
//筛选出30天的数据
  get MonthRecordList(){
    return this.recordList.filter(t=>dayjs(t.createdAt).format('YYYY-MM') ===this.month)
  }
  get tagName (){
    type Result ={name:string,amount:number}[]
    let result:Result=[{name:'',amount:0}]

    for (let i=0;i<this.MonthRecordList.length;i++){

      const current=this.MonthRecordList[i]
      if(current.tags.length >1 ){
        let name= current.tags.map(t=>t.name).join(',')
         let amount = current.amount
        let result:Result=[{name:name[0],amount:0}]
        for(let i=0;i<name.length;i++){

        }

       // ({tag:t.tags,amount:t.amount})
       return this.MonthRecordList
      }else {
        let name=current.tags.map(t=>t.name).toString()
        let amount =current.amount

      }
    }

  }
  beforeCreate(){
    this.$store.commit('fetchRecords')
  }

  // get tag(){
  //   // return this.recordList.map(t=>t.tags)
  //   return  this.recordList.map(t=>({tag:(t.tags).map(t=>t.name),amount:t.amount,createdAt:t.createdAt}))// 方法2
  // }

  get x(){
    console.log(this.MonthRecordList);
    const today=dayjs()
    const array =[]

    for(let i=0;i<=29;i++){
      const dateString=today.subtract(i,'day').format('YYYY-MM-DD') //获取30天日期
      const foundRecord =_.find(this.recordList,{createdAt:dateString}) //找到 30 天 日期对应的数据

      array.push({date:dateString,value:foundRecord ?foundRecord.amount :0 ,tag:foundRecord ? foundRecord.tags : []}) // 将数据放入数组中




    }
    for(let i=0;i<this.recordList.length;i++){

    }





    // console.log(array);
    //筛选对象中的 数据中的 两个数据
    this.recordList.map(t=>_.pick(t,['tags','amount']))// 方法1
    // this.recordList.map(t=>({tag:t.tags,amount:t.amount}))// 方法2
    return {

        tooltip: {
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

