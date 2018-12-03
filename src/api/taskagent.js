import fetch from '@/utils/fetch'

export function upContractList() {
  return fetch({
    url: '/index/agency',
    method: 'post'
  });
}

export function selectTaskAgentVoList() {
  return fetch({
    url: '/taskagent/agentlist',
    method: 'get'
  });
}
