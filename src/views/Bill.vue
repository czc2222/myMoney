
<template>

  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
    <ul>
      <li v-for="record in result" :key="record.id">
        {{record}}
      </li>
    </ul>
  </Layout>



</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList'
import intervalList from '@/constants/intervalList';


@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  type='-'
  interval= 'day'
  recordTypeList=recordTypeList
  intervalList=intervalList
  get recordList(){
    return (this.$store.state as RootState).recordList
  }
  get result(){
    const {recordList} =this
    const hashTable:{[key:string]:RecordItem[]}={} //声明一个空对象的数组
    for(let i=0;i< recordList.length;i++){
     const [date,time] = recordList[i].createdAt.split('T')
      hashTable[date] =hashTable[date] || []  //初始值
      hashTable[date].push(recordList[i])
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
</style>