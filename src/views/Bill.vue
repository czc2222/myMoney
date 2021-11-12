
<template>

  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>

    <ol v-if="groupList.length > 0">
      <li v-for="(group,index) in groupList" :key="index">
        <h3 class="title">{{beautify(group.title)}} <span>{{group.total}}</span> </h3>
        <ol>
          <li class="record" v-for="(item,index) in group.items" :key="index">
            <div class="wrapper">
              <div class="item" v-for="icon in item.tags" :key="icon.id">
                <Icon :name="icon.svg"/>
                <span>{{icon.name}}</span>
              </div>
            </div>

            <span class="notes"> {{item.notes}}</span>
            <span>￥{{item.amount}} </span>

          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      <Icon name="record"/>

      <span>暂时还没有记录,快去记一笔吧~</span>
    </div>
  </Layout>



</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList'

import Icon from '@/components/Icon.vue';
import dayjs from 'dayjs';
import clone from '@/lib/clone';


@Component({
  components: {Tabs,Icon}
})
export default class Statistics extends Vue {
  type='-'
  recordTypeList=recordTypeList


  beautify(string:string){
    const today=dayjs()
    const date=dayjs(string)
    if(date.isSame(today,'day')){
      return '今天'
    }else if(date.isSame(today.subtract(1,'day'),'day')){
      return '昨天'
    }else if(date.isSame(today.subtract(2,'day'),'day')){
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
  get groupList(){
    const {recordList} =this
    const sortList = clone(recordList)
        .filter(t=>t.type === this.type)
        .sort((a,b)=>dayjs(b.createdAt).valueOf() -dayjs(a.createdAt).valueOf())
    if(sortList.length === 0) {return []}//1
    type Result={title:string,total?:number,items:RecordItem[]}[]//1
    const result:Result =[{title:dayjs(sortList[0].createdAt ).format('YYYY-MM-DD'),items:[sortList[0]]}]//1
    for(let i=1;i<sortList.length;i++){//1
      const current =sortList[i]//1
      const last = result[result.length -1]//1
      if(dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
        last.items.push(current)
      }else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'),items: [current]})
      }
    }
    result.forEach(t=>t.total = t.items.reduce((sum,item)=>sum + item.amount,0))
    //或者 result.map(t=>t.total = t.items.reduce((sum,item)=>sum + item.amount,0))  不需要map的返回值，让里面的amount 自相加
    return result

  }
  beforeCreate(){
    this.$store.commit('fetchRecords')
  }
}
</script>

<style lang="scss" scoped>
.noResult{
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center ;
  .icon{
    width: 100px;
    height:100px;
  }
  span{
    padding:16px;
   text-align: center;
  }
}
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
