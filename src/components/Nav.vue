<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>

        记账

      </router-link>



    <router-link to="/bill" class="item" active-class="selected">
      <Icon name="bill"/>
      明细</router-link>

    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      图表</router-link>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Nav extends Vue {
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  > .item {
    padding: 2px 0;
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color:#7f7f7f;
    .icon {
      width: 32px;
      height: 32px;

    }
  }
  > .item.selected{
    .icon {
      color: $color-highlight;
    }

  }
}
</style>