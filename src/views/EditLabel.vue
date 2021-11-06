<template>
  <layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"/>
      <span class="title">编辑标签</span>
      <span class="right" @click="finish">完成</span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="update"
                field-name="icon图标" placeholder="请输入类别名称"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </layout>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/money/FormItem.vue';
import Button from '@/components/Button.vue';
import store from '@/store/index2';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined;

  created() {//获取已经生成的标签
    this.tag = store.findTag(this.$route.params.id);//获取选中编辑的标签数据;
    if (!this.tag) {
      this.$router.replace('/404');//如果没有选中编辑标签，直接404
    }
  }

  update(name: string) {//更新标签名
    if (this.tag) {
      store.updateTag(this.tag.id, name);
    }

  }

  remove() {//删除标签
    if (this.tag) {
      store.removeTag(this.tag.id);

    }
    // if(this.tag){
    //   if(window.removeTag(this.tag.id)){
    //     this.$router.back()
    //   }else{
    //     window.alert('删除失败')
    //   }
    // }
  }

  goBack() {//回退
    this.$router.back();
  }

  finish() {
    store.saveTags
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .right {
    font-size: 14px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>