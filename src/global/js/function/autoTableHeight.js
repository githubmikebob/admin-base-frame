/**
 * 自动调整表格高度
 * @param size 表格每页条数
 * @param head 头部高度
 * @param row 表格行高
 * @param tba tab高度
 * @param type  1-返回条数 ，''-返回高度
 * @param tabHead tab 高度
 * @return height 表格高度 / size 表格每页条数
 */
export default function (size, head, row, tab, type) {
  if (size === 0) size = Math.floor(((document.body.clientHeight - 195 - head - tab) / row))
  let height = row * size + head
  if (type === 1) return size
  else return height
}
