
<template>

  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <ol>
      <li v-for="(record,index) in result" :key="index">
        <h3 class="title">{{beautify(record.title)}}</h3>
        <ol>
          <li class="record" v-for="item in record.items" :key="item.createdAt">
            <div class="wrapper">
              <div class="item" v-for="icon in item.tags" :key="icon.id">
                <Icon :name="icon.svg"/>
                <span>{{icon.name}}</span>
              </div>
            </div>


<!--            <span>{{tagString(item.tags)}}</span>-->
            <span class="notes"> {{item.notes}}</span>
            <span>￥{{item.amount}} </span>

          </li>
        </ol>
      </li>
    </ol>
  </Layout>



</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList'
import intervalList from '@/constants/intervalList';
import Icon from '@/components/Icon.vue';
import dayjs from 'dayjs';


@Component({
  components: {Tabs,Icon}
})
export default class Statistics extends Vue {
  type='-'
  interval= 'day'
  recordTypeList=recordTypeList
  intervalList=intervalList

  beautify(string:string){
    const today=dayjs()
    console.log(today);
    const date=dayjs(string)
    if(date.isSame(today,'day')){
      return '今天'
    }else if(date.isSame(today.subtract('1','day'),'day')){
      return '昨天'
    }else if(date.isSame(today.subtract('2','day'),'day')){
      return '前天'
    }else if(date.isSame(today,'year')){
      return date.format('M月DD日')
    }else {
      return date.format('YYYY年M月DD日')
    }
  }

  get recordList(){
    return (this.$store.state as RootState).recordList
  }
  get result(){
    const {recordList} =this
    type hashTableValue = {title:string,items:RecordItem[]}
    const hashTable:{[key:string]: hashTableValue}={} //声明一个空对象的数组
    for(let i=0;i< recordList.length;i++){
     const [date,time] = recordList[i].createdAt.split('T')
      hashTable[date] =hashTable[date] || {title:date,items:[]} //初始值
      hashTable[date].items.push(recordList[i])
    }
    return hashTable
  }
  beforeCreate(){
    this.$store.commit('fetchRecords')
  }
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item{
  background: #fad956;

}
%item {
  padding: 0 16px;
  min-height: 40px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.title {
  @extend %item;
  display: flex;
  justify-content: space-between;
}

.record {

border-bottom: 1px #f1eeee solid;
  background: white;
  @extend %item;
  .wrapper{

    display: flex;

    .item{

      display: flex;
      align-items: center;
      margin-right: 10px;
      .icon{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #f9d856;
        margin-right: 5px;
      }
    }

  }
 .notes{
   margin-right: auto;
   white-space: normal;
   word-wrap: break-word;
   word-break: break-all;
   color:#999;
   font-size: 14px;
 }

}
</style>
