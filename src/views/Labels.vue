
<template>
  <Layout>
    <div class="tags">

      <router-link :to="`/labels/edit/${tag.id}`"
                   v-for="tag in tags" :key="tag.id"
                   class="tag">

        <span>
          <Icon class="leftIcon" :name="tag.name"/>
          {{tag.name}}
        </span>
        <Icon name="delete" class="delete" @click="remove"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag"
              @click="createTag">
        新建标签
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';



@Component({
  components: {Button},

})
export default class Labels extends mixins(TagHelper){
   get tags(){
     return this.$store.state.tagList
   }
  beforeCreate(){

    this.$store.commit('fetchTags')

  }
  remove(){

      // tagListModel.remove()

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
  background: #767676;
  color: white;
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
