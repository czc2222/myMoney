<template>
  <div>

    <div>
      <div class="iconList">
        <ul v-for="(group,index) in selectType" :key="index">
          <div class="type">{{ group.title }}</div>
          <div class="xxx">
            <li v-for="icon in group.items" :key="icon.name"
                :class="{selected:selectedTags.indexOf(icon.name)>=0}"
                @click="toggle(icon.name)"
                class="item"

            >
              <Icon :name="icon.name"/>
              {{ icon.name }}

            </li>
          </div>

        </ul>
      </div>
    </div>

  </div>


</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import iconItem from '@/constants/iconItem';


@Component
export default class iconList extends Vue {
  @Prop(String) readonly value!: string;
  iconList = [];
  selectedTags: string = this.value;

  get type() {
    return this.$route.params.type;
  }

  get selectType() {
    const hashmap = {};
    type hashmapValue={title:string,items:iconItem[]}
    if (this.type === '-') {
      this.iconList = iconItem.filter(t => t.type === '-');

      for (let i = 0; i < this.iconList.length; i++) {
        const content = this.iconList[i].svg;
        hashmap[content] = hashmap[content] || {title: content, items: []};
        hashmap[content].items.push(this.iconList[i]);
      }


    } else {
      this.iconList = iconItem.filter(t => t.type === '+');
      for (let i = 0; i < this.iconList.length; i++) {
        const content = this.iconList[i].svg;
        hashmap[content] = hashmap[content] || {title: content, items: []};
        hashmap[content].items.push(this.iconList[i]);

      }
    }
    return hashmap;

  }




  toggle(tag: string) {
    this.selectedTags = tag;
    this.$emit('update:value', tag);

  }
}
</script>

<style lang="scss" scoped>


.iconList {

  > ul {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;


    .type {
      font-size: 14px;
      text-align: center;
      margin: 20px 0px;

    }

    .xxx {
      display: flex;

      flex-wrap: wrap;
      width: 100%;

      > .item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: 6px 0;


        width: 20%;


        &.selected {
          .icon {
            background: #f9d856;
          }

        }

        .icon {
          width: 40px;
          height: 40px;
          background: #e8e8e8;
          padding: 5px 0;
          border-radius: 50%;

        }
      }


    }
  }

}
</style>