import fetch from '@/utils/fetch'

export function getList(query) {
  return fetch({
    url: '/organ/list',
    method: 'get',
    params: query
  })
}

export function provinceViewList(query) {
  return fetch({
    url: '/organ/province-view-list',
    method: 'get',
    params: query
  })
}

export function organizationList(query) {
  return fetch({
    url: '/organ/list-by-page',
    method: 'get',
    params: query
  })
}

export function getOrgan(id) {
  return fetch({
    url: '/organ/select/' + id,
    method: 'get'
  })
}

export function submitOrgan(isEdit, organ) {
  if (isEdit) {
    return updateOrgan(organ)
  } else {
    return addOrgan(organ)
  }
}

export function addOrgan(data) {
  return fetch({
    url: '/organ/add/',
    method: 'post',
    data: data
  })
}

export function updateOrgan(data) {
  return fetch({
    url: '/organ/update/',
    method: 'post',
    data: data
  })
}

export function teamList(query) {
  return fetch({
    url: '/organ/list-team?t=' + new Date(),
    method: 'get',
    params: query
  })
}

export function userList(query) {
  return fetch({
    url: '/organ/list-user',
    method: 'get',
    params: query
  })
}

export function userListByBelongId(query) {
  return fetch({
    url: '/organ/list-user-belong-id',
    method: 'get',
    params: query
  })
}

export function modifyOrganUserList(data) {
  return fetch({
    url: '/organ/modify-organ-user-list',
    method: 'post',
    data: data
  })
}

export function getDutyList(query) {
  return fetch({
    url: '/organ/list-duty',
    method: 'get',
    params: query
  })
}

export function getTeamDetail(teamId) {
  return fetch({
    url: `/organ/select/${teamId}`,
    method: 'get'
  })
}

export function getTeamList(query) {
  return fetch({
    url: '/organ/select-team-list',
    method: 'get',
    params: query
  })
}

export function provinceAndCityViewList() {
  return fetch({
    url: '/organ/province-city-view-list',
    method: 'get'
  })
}

export function loadProvinceAndCityInfo(organId) {
  return fetch({
    url: `/organ/province-city/${organId}`,
    method: 'get'
  })
}

// 查询部门终端机物理地址
export function getTerminalArea(query) {
  return fetch({
    url: `/organ/select-by-dptId`,
    method: 'get',
    params: query
  })
}

// 团队管理提交修改
export function submitOrganTeam(isEdit, organ) {
  if (isEdit) {
    return updateOrganTeam(organ);
  } else {
    return addOrgan(organ);
  }
}

// 团队管理修改
export function updateOrganTeam(data) {
  return fetch({
    url: `/organ/update-team/`,
    method: `post`,
    data: data
  });
}

export function getDutyCodeList(){
  return fetch({
    url: `/user/allList`,
    method: `get`,
    // data: data
  });
}
