
<template>
  <div>
    <Top @click="goBack">
      {{iconType}}类别设置
    </Top>
    <div class="tags">
      <div
                   v-for="tag in tags" :key="tag.id"
                   class="tag">

        <span>
          <Icon class="leftIcon" :name="tag.svg"/>
          {{tag.name}}
        </span>
        <Icon name="delete" class="delete" @click="remove(tag.id)"/>
      </div>
    </div>
    <div class="createTag-wrapper">

        <Button class="createTag"
                @click="addRouter">
          添加类别
        </Button>


    </div>

  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';
import Top from '@/components/Top'



@Component({
  components: {Button,Top},

})
export default class Labels extends mixins(TagHelper){

   get tags(){
     return this.$store.state.tagList.filter(t=>t.type === this.type)
   }
   get type(){
     return this.$store.state.currentTag
   }
  get iconType() {
    const map = {
      '-': '支出',
      '+': '收入'
    }
    return map[this.type]
  }
  addRouter(){
    this.$router.push(`/labels/${this.type}/${this.type}`)

  }
  beforeCreate(){

    this.$store.commit('fetchTags')


  }
  remove(id:string){

      this.$store.commit('removeTag',id)

  }
  goBack() {//回退
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>

.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    span{
      display: flex;
      align-items: center;
    }
    .leftIcon{
      width: 30px;
      height: 30px;
      background: #e8e8e8;
      color:black;
      padding:5px 0;
      margin-right: 20px;
      border-radius: 50%;
    }
    .delete {
      width: 25px;
      height: 25px;
      color: #fb4939;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #fad956;
  color: black;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>
