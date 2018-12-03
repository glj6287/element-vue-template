import fetch from '@/utils/fetch'

export function getOrgCodeList() {
  return fetch({
    url: `/organ/list`,
    method: 'get',
    // params: query
  })
}

export function userList(query) {
  return fetch({
    url: '/user/list-by-page',
    method: 'get',
    params: query
  })
}

export function getUser(userId) {
  return fetch({
    url: `/user/info/${userId}`,
    method: 'get'
  })
}

export function submitUser(isEdit, user) {
  if (isEdit) {
    return updateUser(user)
  } else {
    return addUser(user)
  }
}

export function handleRoleList(userId) {
  return fetch({
    url: `/user/getcommunity`,
    method: 'get',
    data:{
      userId
    }
  })
}

function addUser(user) {
  return fetch({
    url: '/user/add',
    method: 'post',
    data: user
  })
}

function updateUser(user) {
  return fetch({
    url: `/user/update/${user.id}`,
    method: 'post',
    data: user
  })
}


