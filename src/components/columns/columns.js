import indexColumn from './indexColumn'
import textColumn from './textColumn'
import arrayColumn from './arrayColumn';
import priceColumn from './priceColumn'
import tagColumn from './tagColumn'
import tagsColumn from './tagsColumn'
import timeColumn from './timeColumn'
import statusColumn from './statusColumn'
import actionColumn from './actionColumn'

export const columnTemplate = {
  index: indexColumn,
  text: textColumn,
  array: arrayColumn,
  price: priceColumn,
  tag: tagColumn,
  tags: tagsColumn,
  time: timeColumn,
  status: statusColumn,
  action: actionColumn
}

export default columnTemplate
