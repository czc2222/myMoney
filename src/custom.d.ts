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
  tags: Tag
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

interface Window {

}