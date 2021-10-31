<template>
  <div class="nav-wrapper">
    <div class="content">
      money
    </div>
    <Nav/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class money extends Vue {
}
</script>

<style lang="scss" scoped>
.nav-wrapper{
  border:1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content{
  overflow: auto;
  flex-grow: 1;
}
</style>