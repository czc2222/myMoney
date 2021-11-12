<template>
  <div  class="noResult">
    <Icon name="record"/>

    <span>暂时还没有记录,快去记一笔吧~</span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NoRecord extends Vue {
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
</style>