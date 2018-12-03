import fetch from '@/utils/fetch'

export function msgPushList(query) {
  return fetch({
    url: '/msg/pushlist-by-page',
    method: 'get',
    params: query
  })
}

export function submitPush(isEdit, msgPush) {
  if (isEdit){
    return updatePush(msgPush)
  } else {
    return addPush(msgPush)
  }
}

export function updatePush(msgPush) {
  return fetch({
    url: '/msg/updatePush',
    method: 'post',
    data: msgPush
  })
}

export function addPush(msgPush) {
  return fetch({
    url: '/msg/addPush',
    method: 'post',
    data: msgPush
  })
}

export function getPush(pushId) {
  return fetch({
    url: `/msg/push/${pushId}`,
    method: 'get'
  })
}
export function selectMsgTempAll() {
  return fetch({
    url: `/msg/selectMsgTempAll`,
    method: 'get'
  })
}

