<template>

  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected:selectedTags===tag}"
          @click="toggle(tag)"
      >

        <Icon :name="tag.svg"/>
        {{tag.name}}
      </li>
      <li  @click="addRouter" class="edit">
        <Icon name="edit"/>
        编辑
      </li>

    </ul>

  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator'

@Component
export default class Tags extends  Vue {
  @Prop(String) type!:string
  @Prop() value!:Tag
  selectedTags=this.value

  get tagList(){
    return this.$store.state.tagList.filter((t:Tag) =>t.type === this.type)

  }
  addRouter(){
    this.$router.push(`/labels/edit`)
    this.$store.commit('saveCurrentTag',this.type)

  }

  created(){
    this.$store.commit('fetchTags',)
  }
  toggle(tag:Tag){
    this.selectedTags =tag
    this.$emit('update:type',this.type)
    this.$emit('update:value',tag)

  }


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
        background: #f6f6f6;
        padding:5px 0;
        border-radius: 50%;

      }

    }
  }

}
</style>