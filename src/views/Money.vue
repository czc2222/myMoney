<template>
  <layout class-prefix="layout">
    <NumberPad :value.sync="record.amount"/>
    <Notes @update:value="OnUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="OnUpdateTags"/>
    <Types :value.sync="record.type" />
  </layout>

</template>
<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';
import Vue from 'vue'
import {Component} from 'vue-property-decorator'

type Record ={
  tags:string[]
  notes:string
  type:string
  amount:number

}

@Component({
  components:{
    Tags, Notes, Types, NumberPad
  }
})
export default class Money extends  Vue {
      tags=['餐饮','购物','日用','交通','蔬菜','水果']
  record:Record={
        tags:[],notes:'',type:'-',amount:0
  }
  OnUpdateTags(value:string[]){
    this.record.tags=value
  }

  OnUpdateNotes(value:string){
    this.record.notes=value
  }

};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>