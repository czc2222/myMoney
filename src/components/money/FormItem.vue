<template>
  <div>
    <label class="formItem">
      <Icon :name="tagSelect"/>
      <span class="name">{{ this.fieldName }}</span>
      <template v-if="type === 'date'">
        <input :type="type||'text'"
               :placeholder="placeholder"
               :value="x(value)"
               @input="OnValueChanged($event.target.value)">
      </template>
      <template v-else>
        <input :type="type||'text'"
               :placeholder="placeholder"
               :value="value"
               @input="OnValueChanged($event.target.value)">
      </template>

    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';
@Component
export default class FormItem extends  Vue {
  @Prop({default:''}) readonly value!:string
  @Prop({required:true}) fieldName?:string
  @Prop() tagSelect!:string
  @Prop() placeholder?:string
  @Prop() type?:string
  x(isoString:string){
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

  OnValueChanged(value:string){
    this.$emit('update:value',value)
  }
};
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;

  padding-left: 16px;
  display: flex;
  align-items: center;
  .icon{
    height:30px;
    width:30px;
    background: #fad956;
    border-radius: 50%;
  }
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