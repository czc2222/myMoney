<template>
  <div>
    <div>此页面不存在，请确认输入的网址是否正确</div>
    <div>
      <router-link to="/">返回首页</router-link>
    </div>
  </div>

</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Notfound extends Vue {
}
</script>

<style lang="scss" scoped>

</style>