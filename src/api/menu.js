import fetch from '@/utils/fetch'

export function menuList(query) {
  return fetch({
    url: '/menu/list-by-page',
    method: 'get',
    params: query
  })
}

export function menuButtons(menuCode,query) {
  return fetch({
    url: `/menu/buttonsByPage/${menuCode}?t=${new Date()}`,
    method: 'get',
    params: query
  })
}

export function getMenuDetail(id) {
  return fetch({
    url: '/menu/' + id,
    params: 'get'
  })
}

export function addMenu(data) {
  return fetch({
    url: '/menu/add/',
    method: 'post',
    data: data
  })
}

export function menuTree() {
  return fetch({
    url:　`/menu/tree`,
    method: 'get'
  })
}

export function addMenuBtn(menuBtn) {
  return fetch({
    url: '/menu/button/add',
    method: 'post',
    data: menuBtn
  })
}

export function updateMenuBtn(menuBtn) {
  return fetch({
    url: `/menu/button/${menuBtn.id}`,
    method: 'post',
    data: menuBtn
  })
}

export function selectMenu(menuId) {
  return fetch({
    url: `/menu/select/${menuId}`,
    method: 'get'
  })
}

export function updateSysMenu(sysMenu) {
  return fetch({
    url: '/menu/update',
    method: 'post',
    data: sysMenu
  })
}

export function deleteMenuBtn(buttonId) {
  return fetch({
    url: `/menu/button/delete/${buttonId}`,
    method: 'post'
  })
}
