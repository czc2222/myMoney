<template>
  <layout class-prefix="layout">
    {{ record }}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="在这里输入备注"
                @update:value="OnUpdateNotes"
      />
    </div>
      <Tags :data-source.sync="tags" @update:value="OnUpdateTags"/>
      <Types :value.sync="record.type"/>
  </layout>

</template>
<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tags from '@/components/money/Tags.vue';
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagLIstModel';

const recordList: RecordItem[] = recordListModel.fetch();



@Component({
  components: {
    Tags, FormItem, Types, NumberPad
  }
})
export default class Money extends Vue {
  tags = window.tagList;
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  OnUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  OnUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    recordListModel.create(this.record)
  }

  @Watch('recordList')
  onRecordListChanged() {
    recordList.save();
  }

};
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 8px 0;
}
</style>