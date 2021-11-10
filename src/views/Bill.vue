
<template>

  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <ol>
      <li v-for="(record,index) in result" :key="index">
        <h3 class="title">{{record.title}}</h3>
        <ol>
          <li class="record" v-for="item in record.items" :key="item.createdAt">
            <Icon :name="item.tags"/>
            <span>{{item.tags}}</span>
            {{item.amount}} {{item.createdAt}}
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


@Component({
  components: {Tabs,Icon}
})
export default class Statistics extends Vue {
  type='-'
  interval= 'day'
  recordTypeList=recordTypeList
  intervalList=intervalList
  // tagString(tags){
  //   return tags.join(',')
  // }
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
  justify-content: center;
  align-items: center;
}
.title {
  @extend %item;
  display: flex;
  justify-content: space-between;
}

.record {
  background: white;
  @extend %item;
}
</style>
