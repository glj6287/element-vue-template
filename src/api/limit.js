import fetch from '@/utils/fetch'

export function menusByRole(roleCode) {
  return fetch({
    url: `/limit/menus/${roleCode}`,
    method: 'get'
  })
}

export function roleByUser(userCode) {
  return fetch({
    url: `/limit/roles/${userCode}`,
    method: 'get'
  })
}

export function modifyUserRole(userCode, roleCodes) {
  return fetch({
    url: `/limit/roles/${userCode}?${roleCodes}`,
    method: 'post'
  })
}

export function modifyRoleMenu(roleCode, newMenuCodeArr, newBtnIdArr, deletedMenuCodeArr, deletedBtnIdArr) {
  return fetch({
    url: `/limit/menus/${roleCode}`,
    method: 'post',
    data: {
      "newMenuCodeArr": newMenuCodeArr,
      "newBtnIdArr": newBtnIdArr,
      "deletedMenuCodeArr": deletedMenuCodeArr,
      "deletedBtnIdArr": deletedBtnIdArr
    }
  })
}
