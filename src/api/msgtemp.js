import fetch from '@/utils/fetch'

export function msgTempList(query) {
  return fetch({
    url: '/msg/list-by-page',
    method: 'get',
    params: query
  })
}

export function submitTemp(isEdit, msgTemplate) {
  if (isEdit){
    return updateTemp(msgTemplate)
  } else {
    return addTemp(msgTemplate)
  }
}

export function updateTemp(msgTemplate) {
  return fetch({
    url: '/msg/updateTemp',
    method: 'post',
    data: msgTemplate
  })
}

export function addTemp(msgTemplate) {
  return fetch({
    url: '/msg/addTemp',
    method: 'post',
    data: msgTemplate
  })
}

export function getTemp(tempId) {
  return fetch({
    url: `/msg/temp/${tempId}`,
    method: 'get'
  })
}

