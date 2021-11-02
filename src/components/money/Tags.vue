<template>
  <div class="tags">

    <ul class="current">
      <li>
        <Icon name="dinner"/>
        餐饮
      </li>
      <li>
        <Icon name="shopping"/>
        购物
      </li>
      <li>
        <Icon name="lives"/>
        日用
      </li>
      <li>
        <Icon name="transport"/>
        交通
      </li>
      <li>
        <Icon name="vegetable"/>
        蔬菜
      </li>
      <li>
        <Icon name="fruit"/>
        水果
      </li>
      <li>
        <Icon name="edit"/>
        编辑
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
export default {
  name: 'Tags'
};
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin:6px 0;
      width: 25%;
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