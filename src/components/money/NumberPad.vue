<template>
  <div class="numberPad">
    <div class="wrapper">

      <div class="createAt">
        <span class="name">日期</span>
        <input type="date"
               placeholder="在这里输入日期"
               :value="beautify(date)"
               @input="OnDateChanged($event.target.value)">
      </div>
      <div class="output">{{ output }}</div>
    </div>

    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok" >OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';
import FormItem from '@/components/money/FormItem.vue';
import dayjs from 'dayjs';

@Component({components:{
    FormItem
  }})
export default class NumberPad extends  Vue {
  @Prop(Number) readonly value!:number
  @Prop()  date!:string

  output:string=this.value.toString();


  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent!;
    if (this.output.length === 8) { return; }
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {return;}
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
    console.log(this.date);
  }
  OnDateChanged(date:string){
    this.$emit('update:date',date)
  }
  beautify(isoString:string){
    return dayjs(isoString).format('YYYY-MM-DD')
    // const today=dayjs()
    // const date=dayjs(isoString)
    // if(date.isSame(today,'day')){
    //   console.log('hi');
    //   return '今天'
    // }else  {
    //   return date.format('YYYY-MM-DD')
    // }
  }

  ok() {
    this.$emit('update:value',parseFloat(this.output))
    this.$emit('submit',parseFloat(this.output))
    this.output = '0';
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .wrapper{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    .createAt{
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
  }
  .output {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @extend %clearFix;
    font-size: 28px;
    font-family: Consolas, monospace;
    padding: 5px 16px;
    text-align: right;
    height: 50px;
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok {
        height: 64*2px;
        float: right;
      }
      &.zero {
        width: 25*2%;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2%);
      }
      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4*3%);
      }
      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4*4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4*5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4*6%);
      }
    }
  }
}
</style>