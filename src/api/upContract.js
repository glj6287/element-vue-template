import fetch from '@/utils/fetch'
import fetchFile from '@/utils/fetchFile'

export function upcontractList(query) {
  return fetch({
    url: '/contractUp/selectContractUpInfo',
    method: 'get',
    params: query
  });
}

export function upcontractDetail(contractCode) {
  return fetch({
    url: `/contractUp/getContractCodeInfo/${contractCode}`,
    method: 'get',
    params: contractCode
  });
}

export function throwLease(throwLease) {
  return fetch({
    url: `/contractUp/throwLease`,
    method: 'post',
    data: { contractCode:throwLease.contractCode, remark:throwLease.remark, throwLeaseTime:throwLease.throwLeaseTime, version:throwLease.version }
  });
}

export function submitAudit(aduit) {
  if (aduit.auditresult === 1) {
    return auditSuccess(aduit);
  } else if (aduit.auditresult === 2) {
    return auditRefuse(aduit);
  } else {
    alert("请选择审核结果！");
  }
}

export function auditSuccess(aduit) {
  return fetch({
    url: `/contractUp/updateContractPass`,
    method: 'post',
    data: { contractCode:aduit.contractCode, version:aduit.version ,depict:aduit.depict}
  });
}

export function auditRefuse(aduit) {
  return fetch({
    url: `/contractUp/updateContractTurnDown`,
    method: 'post',
    data: { contractCode:aduit.contractCode, turnDownDepict:aduit.turnDownDepict, version:aduit.version }
  });
}

export function exportUpContract(query){
  return fetchFile({
    url: '/contractUp/exportUpContract',
    method: 'get',
    params: query
  });
}

//房源管理房东信息
export function upcontractDetail1(query){
  return fetch({
    url: `/houseInfo/getLandlordInfo/${query}`,
    method: 'get'
    // params: query
  });
}
