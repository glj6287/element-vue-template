import fetch from '@/utils/fetch'

export function roleList(query) {
  return fetch({
    url: '/role/list-by-page',
    method: 'get',
    params: query
  })
}

export function allRoleList() {
  return fetch({
    url: '/role/all',
    method: 'get'
  })
}

export function roleEdit(role) {
  return fetch({
    url: '/role/update',
    method: 'post',
    data: role
  })
}

export function roleAdd(role) {
  return fetch({
    url: '/role/add',
    method: 'post',
    data: role
  })
}

export function members(roleId, query) {
  return fetch({
    url:　`/role/members/${roleId}`,
    method: 'get',
    params: query
  })
}
