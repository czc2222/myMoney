<template>
  <layout>
    <Top>
      添加支出类别
      <span slot="done" @click="save">完成</span>
    </Top>

    <div class="form-wrapper">
      <FormItem :value="tagName"
                @update:value="updateName"
                :tag-select="tag" field-name="null" placeholder="请输入类别名称(不超过4个汉字)"/>
    </div>
    <icon-list :value="tag" @update:value="updateIcon">娱乐</icon-list>
<!--    <icon-list :value="repast">餐饮</icon-list>-->
<!--    <icon-list :value="shopping">购物</icon-list>-->
<!--    <icon-list :value="transportation">交通</icon-list>-->
<!--    <icon-list :value="live">居住</icon-list>-->
<!--    <icon-list :value="medical">医疗</icon-list>-->


  </layout>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/money/FormItem.vue';
import Button from '@/components/Button.vue';
import Top from '@/components/Top.vue';
import amusements from '@/store/amusement';
import IconList from '@/components/iconList.vue';
import repasts from '@/store/repast.ts';
import shoppings from '@/store/shopping.ts';
import transportations from '@/store/transportation.ts'
import lives from '@/store/live.ts'
import medicals from '@/store/medical';
import iconItem from '@/constants/iconItem';
import iconList from '@/components/iconList.vue';

@Component({
  components: {IconList, Button, FormItem, Top},

})
export default class EditLabel extends Vue {
  iconList= iconItem.map(t=>t.name)//icon 集合体

  // tag: TagItem = {name: 'food', value: '餐饮'};
  amusement = amusements
  repast=repasts
  shopping =shoppings
  transportation = transportations
  live = lives
  medical = medicals
  tagName = ''
  tag= this.iconList[0]

  // selectTag(){
  //   this.tag = this.amusement
  //
  // }

  save() {//获取已经生成的标签
    // const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    const names =this.$store.state.tagList.map(t => t.name)[0]
    const name =this.tagName
    console.log(name);
    console.log(names);
    if(name.length === 0){
      window.alert('标签名不能为空')

    }else if(names.indexOf(name) >=0){
      window.alert('标签名重复了')
      this.tagName=''
    }else {
      this.$store.commit('createTag',
          {
            svg: this.tag,
            type: this.$route.params.type as moneyType,
            name: this.tagName
          });
      window.alert('已保存')
      this.tagName = '';
      this.$router.back();
    }


    // this.$store.commit('setCurrentTag', id);


    // if (!this.currentTag) {
    //   this.$router.replace('/404');//如果没有选中编辑标签，直接404
    // }
  }
     updateName(value:string){
    this.tagName = value
    }
  updateIcon(value:string){
    this.tag =value
  }
  // update(name: string) {//更新标签名
  //   if (this.currentTag) {
  //     this.$store.commit('updateTag', {id:this.currentTag.id,name});
  //   }
  //
  // }



  finish() {
    console.log('hi');
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