import fetch from "@/utils/fetch";
/**
 * 租客信息列表
 */

export function getTenantsInfo(query) {
    return fetch({ 
      url: "/tenantsInfo/tenantInfoQuery",
      method: "post",
      data: query
    });
  }


  export function updateMessage(query) {
    return fetch({ 
      url: "/tenantsInfo/tenantInfoUpdate",
      method: "post",
      data: query
    });
  }