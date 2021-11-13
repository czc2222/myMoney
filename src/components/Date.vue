<template>
  <div class="createAt">
    <span class="name">月份</span>
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
  }
}
</script>

<style lang="scss" scoped>
.createAt {
  font-size: 14px;

  display: flex;
  align-items: center;
  justify-content: center;


  .name {
    display: flex;
    align-items: center;
    font-size: 20px;
    justify-content: center;
    padding-right: 16px;

    height: 30px;
  }

  input {
    height: 30px;

    background: transparent;
    border: none;
    padding-right: 16px;

  }
}


</style>