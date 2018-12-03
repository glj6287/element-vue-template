import fetch from "@/utils/fetch";

/**
 * 租出申请列表
 * @param query
 */
export function rentApplyList(query) {
  return fetch({
    url: "/rentApply/page",
    method: "post",
    data: query
  });
}

/**
 * 租出申请-详情-基本信息
 * @param query
 */
export function view(rentApplyCode) {
  return fetch({
    url: `/rentApply/view/${rentApplyCode}`,
    method: "get"
  });
}

/**
 * 租出申请-详情-日志
 * @param query
 */
export function logByApplyCode(rentApplyCode) {
  return fetch({
    url: `/rentApply/logByApplyCode/${rentApplyCode}`,
    method: "get"
  });
}
