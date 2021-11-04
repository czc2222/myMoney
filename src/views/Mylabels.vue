<template>
  <Layout>
    <Types/>
    <Tags/>



  </Layout>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/money/Types.vue';
import Tags from '@/components/money/Tags.vue';
import FormItem from '@/components/money/FormItem.vue';
import NumberPad from '@/components/money/NumberPad.vue';
import tagListModel from '@/models/tagLIstModel';

@Component({
  components: {
    Tags, Types
  }
})
export default class Labels extends Vue {
  tags=tagListModel.fetch()
}
</script>

<style lang="scss" scoped>

</style>