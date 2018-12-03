import fetch from '@/utils/fetch'

export function dictTypeList() {
  return fetch({
    url: '/dict/typeList',
    method: 'get'
  })
}

export function dictDataList(query) {
  return fetch({
    url: '/dict/dictDataList',
    method: 'get',
    params: query
  })
}

export function getDictData(dictId) {
  return fetch({
    url: `/dict/dictData/${dictId}`,
    method: 'get'
  })
}

export function submitDictData(isEdit, dictData) {
  if (isEdit){
    return updateDictData(dictData)
  } else {
    return addDictData(dictData)
  }
}

function addDictData(dictData) {
  return fetch({
    url: '/dict/saveDictData',
    method: 'post',
    data: dictData
  })
}

function updateDictData(dictData) {
  return fetch({
    url: '/dict/updateDictData',
    method: 'post',
    data: dictData
  })
}


export function typePageList(query) {
  return fetch({
    url: '/dict/typePageList',
    method: 'get',
    params: query
  })
}

export function submitDictType(isEdit, dictType) {
  if (isEdit){
    return updateDictType(dictType);
  } else {
    return addDictType(dictType);
  }
}

function addDictType(dictType) {
  return fetch({
    url: '/dict/saveDictType',
    method: 'post',
    data: dictType
  })
}

export function getDictType(typeId) {
  return fetch({
    url: `/dict/dictType/${typeId}`,
    method: 'get'
  })
}

function updateDictType(dictType) {
  return fetch({
    url: '/dict/updateDictType',
    method: 'post',
    data: dictType
  })
}