import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createID';
import defaultTagList from '@/constants/defaultTaglist';
import iconItem from '@/constants/iconItem';


Vue.use(Vuex)

type RootState ={
  recordList:RecordItem[],
  tagList:Tag[],
  currentTag?:Tag

}

const store = new Vuex.Store({
  state: {
    recordList:[],
    tagList:[] ,
    currentTag:undefined,

  } as RootState,
  mutations: {
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem('recordList')||'[]') as RecordItem[];
    },
    createRecord(state,record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      state.recordList.push(record2);
      store.commit('saveRecords')
    },
    saveRecords(state){
      window.localStorage.setItem('recordList',JSON.stringify(state.recordList))
    },
    fetchTags(state,){
       state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
       if(!state.tagList|| state.tagList.length === 0){
        store.commit('setDefault')
      }
    },
    setDefault(){
      for(let i = 0;i<defaultTagList.length;i++){
        store.commit('createTag',defaultTagList[i])
      }
    },
    createTag (state,newTag:Tag) {
      const id=createId().toString()
      state.tagList.push({id,name:newTag.name,type:newTag.type,svg:newTag.svg})
      store.commit('saveTags')


    },
    saveTags(state){
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },

    removeTag (state,id: string)  {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags')
      window.alert('删除成功')

    },

    updateTag(state, payload:{id: string, name: string}){
      const {name,id}=payload
      const idList = state.tagList.map(t => t.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(t => t.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;

          store.commit('saveTags')

        }
      }
    },
    // fetchIcon(state){
    //   const id=createId().toString()
    //   if(state.iconList){
    //     state.iconList.id = id
    //     state.iconList.name =iconItem.map(t=>t.name).toString()
    //   }
    //
    //
    //
    // }
  }
})
export default store