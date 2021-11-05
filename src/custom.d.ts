type RecordItem = {
  tags: string[]
  notes: string
  type: string
  amount: number
  createdAt?:Date
}

type Tag = {
  id: string,
  name: string
}
type TagListModel = {
  data: Tag[],
  fetch: () => Tag[]
  create: (name: string) => 'duplicated' | 'success'
  update: (id: string, name: string) => 'duplicated' | 'success' | 'not found'
  save: () => void
  remove: (id: string) => boolean
}

interface Window {
  tagList :Tag[]
  createTag:(name:string) => void
  removeTag:(id:string) => boolean
  updateTag:(id:string,name:string) => 'duplicated' | 'success' | 'not found'
  saveTag: void
  findTag:(id:string) => Tag | undefined
  recordList:RecordItem[]
  createRecord:(record) => void
}