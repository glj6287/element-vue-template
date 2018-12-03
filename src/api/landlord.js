import fetch from "@/utils/fetch";

export function getlandlordList(query){
  return fetch({
    url:"/landlord/selectLandlordPageInfo",
    method:"post",
    data:query
  });
}
