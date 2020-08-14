import { apiPost } from '../common/http'
import { notify } from '../common/message'

export default function (post, reverse = true) {
  if (post.hasOwnProperty('status') && post.hasOwnProperty('id')) {
    let status
    if (reverse) {
      status = post.status === 1 ? 'Disable' : 'Enable'
      post.status = post.status === 1 ? 2 : 1
    } else {
      status = post.status === 1 ? 'Enable' : 'Disable'
    }
    apiPost(this.status_url, { id: post.id, status: status }).then((res) => {
      this.getTable()
      notify(res.message, res.status)
    }).catch((err) => {
      // if (reverse) post.status = post.status === 1 ? 2 : 1
      post.status = post.status === 1 ? 2 : 1
      notify(err.message, err.status)
    })
  } else {
    notify('error.post')
  }
}
