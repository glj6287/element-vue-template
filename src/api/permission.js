import fetch from '@/utils/fetch'

export function getButtons(menuCode) {
  return fetch({
    url: `/user/buttons/${menuCode}`,
    method: 'get'
  })
}
