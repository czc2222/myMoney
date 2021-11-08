<template>

    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
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
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item{
 background: #fad956;

}
</style>