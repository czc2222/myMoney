<template>
  <layout>编辑标签</layout>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagLIstModel';

@Component
export default class EditLabel extends Vue {
  created(){
    const id=this.$route.params.id//获取/edit/:id的 id数字
    tagListModel.fetch()//先将获取的数据进行渲染
    const tags=tagListModel.data //获取所以标签数据
    const tag =tags.filter(t=>t.id ===id)[0]//获取选中编辑的标签数据
    if(tag){
      console.log(tag);
    }else{
      this.$router.replace('/404')//如果没有选中编辑标签，直接404
    }
  }
}
</script>

<style lang="scss" scoped>

</style>