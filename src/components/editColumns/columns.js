import indexColumn from '../columns/indexColumn'
import textColumn from './textColumn'
import autoTextColumn from './autoTextColumn'
import actionColumn from './actionColumn'

export const columnTemplate = {
  index: indexColumn,
  text: textColumn,
  auto_text: autoTextColumn,
  action: actionColumn
}

export default columnTemplate
