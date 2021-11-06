<template>
  <div class="tags">

    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)"
      >
        <Icon :name="tag.name"/>
        {{tag.name}}
      </li>
      <router-link to="/labels" class="edit">
        <Icon name="edit"/>
        编辑
      </router-link>

    </ul>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

@Component({
  computed:{
    tagList(){

    return this.$store.state.tagList

    }
  }
})
export default class Tags extends  Vue {

  selectedTags:string[]=[]
  created(){
    this.$store.commit('fetchTags',)
  }
  toggle(tag:string){
    const index= this.selectedTags.indexOf(tag)
    if(index>=0){
      this.selectedTags.splice(index,1)
    }else{
      this.selectedTags.push(tag)
    }
    this.$emit('update:value',this.selectedTags)

  }

  // create() {
  //
  //   const name = window.prompt('请输入标签名')
  //   if (!name) { return window.prompt('标签名不能为空') }
  //  this.$store.commit('createTag',name)
  //
  // }

};
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li,.edit {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin:6px 0;
      width: 25%;

      &.selected{
        .icon{
          background:#f9d856 ;
        }

      }
      .icon {
        width: 40px;
        height: 40px;
        background: #e8e8e8;
        padding:5px 0;
        border-radius: 50%;

      }

    }
  }

}
</style>