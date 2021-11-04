<template>
  <layout>
    <div>
      <Icon class="leftIcon" name="left"/>
      <span class="title">编辑标签</span>
    </div>
    <Notes field-name="icon图标" placeholder="请输入类别名称"/>
  </layout>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagLIstModel';
import Notes from '@/components/money/Notes.vue';

@Component({
  components: {Notes}
})
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;//获取/edit/:id的 id数字
    tagListModel.fetch();//先将获取的数据进行渲染
    const tags = tagListModel.data; //获取所以标签数据
    const tag = tags.filter(t => t.id === id)[0];//获取选中编辑的标签数据
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace('/404');//如果没有选中编辑标签，直接404
    }
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

  > .rightIcon {
    width: 24px;
    height: 24px;
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