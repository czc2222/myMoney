import createId from '@/lib/createID';

const localStorageName = 'tagList';


const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageName) || '[]');
    return this.data;
  },
  update(id: string, name: string) {
    const idList = this.data.map(t => t.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(t => t.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        //
        // this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  create(name: string) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {return 'duplicated';}
    const id=createId().toString()
    this.data.push({id, name: name});
    this.save();
    return 'success';
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save()
    return true;
  },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  }
};
export default tagListModel;