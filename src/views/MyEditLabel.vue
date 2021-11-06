<template>
  <layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left"/>
      <span class="title">编辑标签</span>
      <span class="right">完成</span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name"
                @update:value="updateTag"
                field-name="icon图标" placeholder="请输入类别名称"/>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </layout>
</template>
<!--<script lang="ts">-->
<!--import Vue from 'vue';-->
<!--import {Component} from 'vue-property-decorator';-->
<!--import tagListModel from '@/models/tagLIstModel';-->
<!--import FormItem from '@/components/money/FormItem.vue';-->
<!--import Button from '@/components/Button.vue';-->

<!--@Component({-->
<!--  components: {Button, FormItem}-->
<!--})-->
<!--export default class EditLabel extends Vue {-->
<!--  tag?: { id: string, name: string } = undefined;-->

<!--  created() {-->
<!--    const id = this.$route.params.id;//获取/edit/:id的 id数字-->
<!--    tagListModel.fetch();//先将获取的数据进行渲染-->
<!--    const tags = tagListModel.data; //获取所以标签数据-->
<!--    const tag = tags.filter(t => t.id === id)[0];//获取选中编辑的标签数据-->
<!--    if (tag) {//如果tag存在-->
<!--      this.tag = tag;-->
<!--    } else {-->
<!--      this.$router.replace('/404');//如果没有选中编辑标签，直接404-->
<!--    }-->
<!--  }-->
<!--  updateTag(name:string){-->
<!--    if(this.tag){-->
<!--      tagListModel.update(this.tag.id,name)-->
<!--    }-->

<!--  }-->
}
<!--</script>-->

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