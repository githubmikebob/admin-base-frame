import IndexColumn from '../Columns/IndexColumn'
import TextColumn from './TextColumn'
import AutoTextColumn from './AutoTextColumn'
import ActionColumn from './ActionColumn'

export const columnTemplate = {
  index: IndexColumn,
  text: TextColumn,
  auto_text: AutoTextColumn,
  action: ActionColumn
}

export default columnTemplate
