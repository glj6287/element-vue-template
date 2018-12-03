import fetch from "@/utils/fetch";

/**
 * 新增APP版本更新
 * @param data
 */
export function save(data) {
  return fetch({
    url: "/pcapp/version/save",
    method: "post",
    data: data
  });
}

/**
 * 查询版本更新历史
 * @param data
 */
export function selectList(data) {
  return fetch({
    url: "/pcapp/version/selectList",
    method: "post",
    data: data
  });
}
