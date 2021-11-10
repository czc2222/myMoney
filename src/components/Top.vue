<template>
  <div class="top">
    <div class="return" @click="goBack">
      <Icon name="left" class="left"/>
      <span>返回</span>
    </div>
    <span class="type">
      <slot/>
    </span>
    <div  class="empty" @click="$emit('click',$event)">
      <slot name="done"/>
    </div>

  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import iconItem from '@/constants/iconItem';

@Component
export default class top extends Vue {


  goBack() {//回退
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.top{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fad956;
  height: 45px;
  > .return{
    display: flex;
    align-items: center;
    .left{
      width: 30px;
      height: 30px;
      color:black;
      padding:5px 0;

    }
  }
  > .type{
    font-size: 20px;


  }
  > .empty{
    width: 45px;
    margin-right: 10px;
  }
}
</style>