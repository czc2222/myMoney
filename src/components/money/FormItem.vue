<template>
  <div>
    <label class="formItem">
      <Icon :name="tagSelect"/>
      <span class="name">{{ this.fieldName }}</span>
      <input type="text" :placeholder="placeholder" :value="value" @input="OnValueChanged($event.target.value)">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';
@Component
export default class FormItem extends  Vue {
  @Prop({default:''}) readonly value!:string
  @Prop({required:true}) fieldName?:string
  @Prop() tagSelect!:string
  @Prop() placeholder?:string

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