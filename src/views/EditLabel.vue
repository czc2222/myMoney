<template>
  <layout>
    <Top>
      添加{{ iconType }}类别
      <span slot="done" @click="save">完成</span>
    </Top>

    <div class="form-wrapper">
      <FormItem :value="tagName"
                @update:value="updateName"
                :tag-select="tag" field-name="" placeholder="请输入类别名称(不超过4个汉字)"/>
    </div>
    <icon-list :value="tag" @update:value="updateIcon"></icon-list>


  </layout>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/money/FormItem.vue';
import Button from '@/components/Button.vue';
import Top from '@/components/Top.vue';

import IconList from '@/components/iconList.vue';

import iconItem from '@/constants/iconItem';


@Component({
  components: {IconList, Button, FormItem, Top},

})
export default class EditLabel extends Vue {
  iconList = iconItem.map(t => t.name);
  tagName = '';
  tag = this.iconList[0];

  get type() {
    return this.$store.state.currentTag;
  }

  get iconType() {
    const map:any = {
      '-': '支出',
      '+': '收入'
    };
    return map[this.type];
  }

  save() {//获取已经生成的标签

    this.$store.commit('fetchTags');
    const names = this.$store.state.tagList.map((t:Tag) => t.name);
    const name = this.tagName;

    if (name.length === 0) {
      window.alert('类别名称不能为空');

    } else if (names.indexOf(name) >= 0) {
      window.alert('标签名重复了');
      this.tagName = '';
    } else {
      this.$store.commit('createTag',
          {
            svg: this.tag,
            type: this.$route.params.type as moneyType,
            name: this.tagName
          });
      window.alert('已保存');
      this.tagName = '';
      this.$router.back();
    }

  }

  updateName(value: string) {
    this.tagName = value;
  }

  updateIcon(value: string) {
    this.tag = value;
  }


  finish() {
    this.$store.commit('saveTags');
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>


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