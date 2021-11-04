<template>
  <router-link :to="this.path" class="edit">
    <Icon name="edit" />
    <slot/>
  </router-link>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Edit extends Vue {
  @Prop() path:any
}
</script>

<style lang="scss" scoped>
.edit {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 6px 0;
  width: 25%;

  &.selected {
    .icon {
      background: #f9d856;
    }

  }

  .icon {
    width: 40px;
    height: 40px;
    background: #e8e8e8;
    padding: 5px 0;
    border-radius: 50%;

  }
}
</style>