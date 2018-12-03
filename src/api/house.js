import fetch from '@/utils/fetch'
import fetchFile from '@/utils/fetchFile'

export function houseList(query) {
  return fetch({
    url: '/houseInfo/page',
    method: 'get',
    params: query
  });
}

export function getLittleList(query) {
  return fetch({
    url: '/houseNeighborhood/findNeighborhoodList',
    method: 'post',
    data: query
  });
}

export function selectCommunityListAll() {
  return fetch({
    url: '/community/selectCommunityListAll',
    method: 'get'
  });
}

export function selectCommunityListMyAll() {
  return fetch({
    url: '/community/selectCommunityListMyAll',
    method: 'get'
  });
}

export function findNeighborhoodInfoMyAll() {
  return fetch({
    url: '/houseNeighborhood/findNeighborhoodInfoMyAll',
    method: 'get'
  });
}

export function enablehouse(operateType) {
  return fetch({
    url: `/houseInfo/enable/${operateType}`,
    method: 'get'
  });
}

export function houseImageList(houseCode) {
  return fetch({
    url: `/houseInfo/houseImageList/${houseCode}`,
    method: 'get'
  });
}

export function detailhouse(houseCode) {
  return fetch({
    url: `/houseInfo/detail/${houseCode}`,
    method: 'get'
  });
}

export function downContract(houseCode) {
  return fetch({
    url: `/houseInfo/downContract/${houseCode}`,
    method: 'get'
  });
}

export function downChangeLog(houseCode) {
  return fetch({
    url: `/houseInfo/downChangeLog/${houseCode}`,
    method: 'get'
  });
}

// 房源列表 下载功能
export function exportExcel(query) {
  return fetchFile({
    url: `/houseInfo/houseExport`,
    method: 'get',
    params: query
  });
}

export function enableHouse(houseCode, operateType, version) {
  return fetch({
    url: `/houseInfo/enable/${houseCode}`,
    method: 'post',
    data: { operateType: operateType, version: version }
  });
}

export function deleteImage(houseCode, attcCode) {
  return fetch({
    url: `/houseInfo/delete/${houseCode}/${attcCode}`,
    method: 'get'
  });
}

export function info(houseCode) {
  return fetch({
    url: `/houseInfo/info/${houseCode}`,
    method: 'get'
  });
}

export function userInfo(communityCode) {
  return fetch({
    url: `/houseInfo/userInfo/${communityCode}`,
    method: 'get'
  });
}

export function updateSteward(house) {
  return fetch({
    url: "/houseInfo/updateSteward",
    method: 'post',
    data: house
  });
}

export function updatePrice(house) {
  return fetch({
    url: "/houseInfo/updatePrice",
    method: 'post',
    data: house
  });
}

export function getHouseApplyList(query) {
  return fetch({
    url: '/houseApply/page',
    method: 'get',
    params: query
  });
}

export function viewHouseBaseInfo(applyCode) {
  return fetch({
    url: `/houseApply/view/${applyCode}`,
    method: 'get'
  });
}

export function viewEvaluateInfo(applyCode) {
  return fetch({
    url: `/houseApply/evaluateInfo/${applyCode}`,
    method: 'get'
  });
}

export function viewFlowLog(applyCode) {
  return fetch({
    url: `/houseApply/flowLog/${applyCode}`,
    method: 'get'
  });
}

/**
 * 房源主要信息-租出申请-详情-基本信息
 * @param query
 */
export function getHouseInfo4Rent(houseCode) {
  return fetch({
    url: `/houseInfo/getHouseInfo4Rent/${houseCode}`,
    method: "get"
  });
}

// 逻辑删除房源及相关合同 Added By KangHua 2018-10-08
export function delHouse(houseCode, version) {
  return fetch({
    url: `/houseInfo/delHouse/${houseCode}/${version}`,
    method: "post"
  });
}

// 所有房源列表（管理员查看所有，其他人员根据社区权限查询）
export function pageAll(query) {
  return fetch({
    url: '/houseInfo/pageAll',
    method: 'get',
    params: query
  });
}
