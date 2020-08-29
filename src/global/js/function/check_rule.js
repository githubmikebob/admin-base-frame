import store from '../../../store'

export default function (rule) {
  let rules = store.state.user.rules
  if (rule.length === 0) return true
  else return rule.some(rule => rules.includes(rule))
}
