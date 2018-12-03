import fetch from '@/utils/fetch'

export function workflowList(query) {
  return fetch({
    url: '/activiti/getProcessDefinitionList',
    method: 'get',
    params: query
  })
}

export function workflowRoleList(query) {
  return fetch({
    url: '/activiti/queryBusiProcessRoleListByPage',
    method: 'get',
    params: query
  })
}


export function queryAllotProcessRole(query) {
  return fetch({
    url: '/activiti/queryAllotProcessRole',
    method: 'get',
    params: query
  })
}

export function bindUserIdToProcess(data) {
  return fetch({
    url: '/activiti/bindUserIdToProcess',
    method: 'post',
    data: data
  })
}

export function showProcessImage(processDefinitionId) {
  return fetch({
    url: '/activiti/showProcessImage',
    method: 'get',
    params: "processDefinitionId="+processDefinitionId
  })
}
