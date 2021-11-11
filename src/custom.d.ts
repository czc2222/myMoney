type moneyType = '-'|'+'

type RootState ={
  recordList:RecordItem[],
  tagList:Tag[],
  currentTag?:string
  createRecordError: Error | null


}

type iconItem ={
  name:string
  svg:string
  type:string
}
type RecordItem = {
  tags: Tag[]
  notes: string
  type: moneyType
  amount: number
  createdAt?:string
}

type Tag = {
  id: string,
  name: string
  type:moneyType
  svg:string
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

}