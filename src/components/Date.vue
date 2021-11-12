<template>
  <div class="createAt">
    <span class="name">日期</span>
    <input type="month"
           :value="beautify(date)"
           @input="OnDateChanged($event.target.value)">
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class Date extends Vue {
  @Prop()  date!:string

  OnDateChanged(date:string){
    this.$emit('update:date',date)
  }
  beautify(isoString:string){
    return dayjs(isoString).format('YYYY-MM')
    // const today=dayjs()
    // const date=dayjs(isoString)
    // if(date.isSame(today,'day')){
    //   console.log('hi');
    //   return '今天'
    // }else  {
    //   return date.format('YYYY-MM-DD')
    // }
  }
}
</script>

<style lang="scss" scoped>
.createAt {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}


</style>