<template>
  <div>
    <div class="type"><slot/></div>
    <ul class="iconList">
      <li v-for="icon in iconName" :key="icon"
          :class="{selected:selectedTags.indexOf(icon)>=0}"
          @click="toggle(icon)"
      >
        <Icon :name="icon"
        />
        {{icon}}
      </li>

    </ul>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import iconItem from '@/constants/iconItem';


@Component
export default class iconList extends Vue {
  @Prop() readonly  value!:string
  iconName = iconItem.map(t=>t.name);
  selectedTags:string= this.value
  toggle(icon:string){
    const index= this.selectedTags.indexOf(icon)

    if(index>=0){
      this.selectedTags.splice(index,1)
    }else{
      this.selectedTags = icon
    }
    this.$emit('update:value',icon)
    console.log(icon);


  }
}
</script>

<style lang="scss" scoped>
.type {
  font-size: 14px;
  text-align: center;
  margin: 20px 0px;
}


.iconList {
  display: flex;
  flex-wrap: wrap;
  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin:6px 0;
    width: 20%;

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
</style>