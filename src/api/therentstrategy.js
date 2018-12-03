import fetch from '@/utils/fetch'

export function getAll() {
  return fetch({
    url: "/rentstrategy/rentstrategyAll",
    method: "get"
  });
}

export function getPageInfo(query) {
  return fetch({
    url: "/rentstrategy/rentstrategyPageInfo",
    method: "post",
    data: query
  });
}

export function  getRentstrategyCodeInfo(rentstrategyCode){
  return fetch({
    url:"/rentstrategy/getRentstrategyCode",
    method:"get",
    params:{
      rentstrategyCode:rentstrategyCode
    }
  })
}

//付款方式
export function getPaymentData() {
  return fetch({
    url: "/data/getPaymentType",
    method: "get"
  })
}

//提交\修改
export  function submit(rentstrategyInfo){
  return fetch({
    url:"/rentstrategy/save",
    method:"post",
    data:rentstrategyInfo
  })
}

export  function deletel(rentstrategyCode, version){
  return fetch({
    url:"/rentstrategy/update",
    method:"post",
    params:{
        version:version,
        rentstrategyCode:rentstrategyCode
    }
  })
}

export function therentstrategySave(rentstrategyInfo) {
  return fetch({
    url: "/rentstrategy/saveRentstrategyInfo",
    method: "post",
    data: rentstrategyInfo
  })
}
