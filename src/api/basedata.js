import fetch from "@/utils/fetch";

/**
 * 签约公司
 */
export function signCompany() {
  return fetch({
    url: "/data/getSignCompany",
    method: "get"
  });
}

/**
 * 合同类型
 */
export function contractType() {
  return fetch({
    url: "/data/getContractType",
    method: "get"
  });
}

/**
 * 业务模式
 */
export function businessMode() {
  return fetch({
    url: "/data/getBusinessMode",
    method: "get"
  });
}

/**
 * 付款方式
 */
export function paymentType() {
  return fetch({
    url: "/data/getPaymentType",
    method: "get"
  });
}

/**
 * 合同状态
 */
export function contractUpType() {
  return fetch({
    url: "/data/getContractUpType",
    method: "get"
  });
}

/**
 * 房源状态
 */
export function houseStatus() {
  return fetch({
    url: "/data/getHouseStatus",
    method: "get"
  });
}

/**
 * 拿房订单状态
 */
export function houseOrderStatus() {
  return fetch({
    url: "/data/getHouseOrderStatus",
    method: "get"
  });
}

/**
 * 应付账单状态
 */
export function payableOrderStatus() {
  return fetch({
    url: "/data/getPayableOrderStatus",
    method: "get"
  });
}

/**
 * 应收账单状态
 */
export function receivableOrderStatus() {
  return fetch({
    url: "/data/getReceivableOrderStatus",
    method: "get"
  });
}

/**
 *  小区
 * @param query
 */
export function getNeighborhoodList(query) {
  return fetch({
    url: "/houseNeighborhood/findNeighborhoodList",
    method: "post",
    data: query
  });
}

/**
 *  当前登陆用户下的小区
 * @param query
 */
export function findNeighborhoodInfoMyAll() {
  return fetch({
    url: "/houseNeighborhood/findNeighborhoodInfoMyAll",
    method: "get"
  });
}

/**
 * 社区
 */
export function getCommunityListAll() {
  return fetch({
    url: "/community/selectCommunityListAll",
    method: "get"
  });
}

/**
 * 当前用户所属所有社区
 */
export function selectCommunityListMyAll() {
  return fetch({
    url: "/community/selectCommunityListMyAll",
    method: "get"
  });
}

/**
 * 租客类型
 */
export function getRenterType() {
  return fetch({
    url: "/data/getRenterType",
    method: "get"
  });
}

/**
 * 下游-租出申请状态
 */
export function getRentApplyStatus() {
  return fetch({
    url: "/data/getRentApplyStatus",
    method: "get"
  });
}

/**
 * 下游-合同状态
 */
export function getContractDsType() {
  return fetch({
    url: "/data/getContractDsType",
    method: "get"
  });
}

/**
 * 下游-合同归档状态
 */
export function getContractDsRecordStatus() {
  return fetch({
    url: "/data/getContractDsRecordStatus",
    method: "get"
  });
}
/**
 * 下游-付款方式
 */
export function getDownstreamPaymentType() {
  return fetch({
    url: "/data/getDownstreamPaymentType",
    method: "get"
  });
}
/**
 * 下游-合同类型
 */
export function getDownstreamContractType() {
  return fetch({
    url: "/data/getDownstreamContractType",
    method: "get"
  });
}

/**
 * 下游-支付方式
 */
export function getDownstreamPayWay() {
  return fetch({
    url: "/data/getDownstreamPayWay",
    method: "get"
  });
}
/**
 * 下游-应收账单支付状态
 */
export function getReceivablePayStatus() {
  return fetch({
    url: "/data/getReceivablePayStatus",
    method: "get"
  });
}
/**
 * 下游-应付账单支付状态
 */
export function getPayablePayStatus() {
  return fetch({
    url: "/data/getPayablePayStatus",
    method: "get"
  });
}
/**
 * 下游-收款银行账户
 */
export function getReceivableBankAccount() {
  return fetch({
    url: "/data/getReceivableBankAccount",
    method: "get"
  });
}

/**
 * banner 归属
 */
export function getBannerBelongto() {
  return fetch({
    url: "/data/getBannerBelongto",
    method: "get"
  });
}

/**
 * 租金类型（5001/固定、5002/阶梯
 */
export function getRentMoneyType() {
  return fetch({
    url: "/data/getRentMoneyType",
    method: "get"
  });
}

/**
 * 附件类型
 */
export function getAttachmentType() {
  return fetch({
    url: "/data/getAttachmentType",
    method: "get"
  });
}

/**
 * 付款方式保存接口
 */
export function savePayment(data) {
  return fetch({
    url: "/rentstrategy/saveRentstrategyInfo",
    method: "POST",
    data: data
  });
}

/**
 * 质押方
 */
export function getPledgeParty() {
  return fetch({
    url: "/data/getPledgeParty",
    method: "get"
  });
}

/**
 * APP列表
 */
export function getAppCode() {
  return fetch({
    url: "/data/getAppCode",
    method: "get"
  });
}

/**
 * 消息类型
 */
export function getMsgType() {
  return fetch({
    url: "/data/getMsgType",
    method: "get"
  });
}

/**
 * 银行列表
 */
export function getBankType() {
  return fetch({
    url: "/data/getBankType",
    method: "get"
  });
}
