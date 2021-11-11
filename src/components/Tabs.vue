<template>

  <ul class="tabs">
    <li v-for=" item in dataSource" :key="item.value"

        :class="liClass(item)" @click="select(item)"
    >
      {{ item.text }}
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DateSourceItem= {text:string,value:string }

@Component
export default class Tabs extends Vue {
  @Prop(Array) dataSource!: DateSourceItem[]
  @Prop(String) readonly  value!:string
  @Prop(String) classPrefix?:string
  liClass(item:DateSourceItem){
    return{
      [this.classPrefix+'-tabs-item']:this.classPrefix,
      selected:item.value === this.value
    }
  }
  select(item:DateSourceItem){
    this.$emit('update:value',item.value)
  }
}

</script>

<style lang="scss" scoped>
.tabs {
  background: #f9d856;
  display: flex;
  text-align: center;
  font-size: 24px;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>