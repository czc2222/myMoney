
import clone from '@/lib/clone';

const localStorageName='recordList'


const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords(){
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageName)||'[]') as RecordItem[];
    return this.recordList
  },
  saveRecords(){
    window.localStorage.setItem(localStorageName,JSON.stringify(this.recordList))
  },

  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.recordList?.push(record2);//等与 this.recordList && this.recordList.push(record2)
    recordStore.saveRecords()
  },
}
recordStore.fetchRecords()
export default recordStore