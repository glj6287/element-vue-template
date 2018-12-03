import fetch from "@/utils/fetch";

export function getpayeeList(query){
  return fetch({
    url:"/housePayee/selectHousePayeePageInfo",
    method:"post",
    data:query
  });
}

export function getPayee(contractCode){
  return fetch({
    url: "/housePayee/getPayee",
    method: "get",
    params: {
      contractCode: contractCode
    }
  });
}

export function updatePayee(data) {
  return fetch({
    url: "/housePayee/update",
    method: "post",
    data: data
  });
};

export function deleteImage(fileCode) {
  return fetch({
    url: `/file/delete/${fileCode}`,
    method: 'post'
  });
}
