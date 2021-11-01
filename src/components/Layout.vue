<template>
  <div>
    <div class="page">
      <div class="content">
        <slot/>
      </div>
      <Nav/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Layout extends Vue {
}

</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
</style>