<template>
  <layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"  :date.sync="record.createdAt"/>
    <div class="notes">
      <FormItem field-name="备注"

                placeholder="在这里输入备注"
                :value="record.notes"
                @update:value="OnUpdateNotes"
      />

    </div>
    <Tags :type.sync="record.type" :value.sync="record.tags"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>

  </layout>

</template>
<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tags from '@/components/money/Tags.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';


@Component({
  components: {
    Tabs,
    Tags, FormItem, NumberPad
  }
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: {id:'',name:'',type:'-',svg:''}, notes: '', type: '-', amount: 0,createdAt:new Date().toISOString()
  };
  recordTypeList = recordTypeList
  get recordList() {
    return this.$store.state.recordList;
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  OnUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    if(!this.record.tags.id || this.record.tags.id === ''){
      return window.alert('请至少选择一个标签')
    }

    if(this.$store.state.createRecordError === null){
      window.alert('已保存')
    }
    this.$store.commit('createRecord', this.record);
    this.record.notes=''
    this.record.createdAt= new Date().toISOString()
  }


};
</script>
<style lang="scss">


.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes,.createAt {
  border-bottom: 1px solid #e6e6e6;
  padding: 8px 0;
  .icon{
    display: none;
  }
}
</style>