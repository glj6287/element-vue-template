import fetch from "@/utils/fetch";
import fetchFile from "@/utils/fetchFile";

export function anchorList(query) {
  return fetch({
    url: "/anchor/page",
    method: "get",
    params: query
  });
}

export function exportanchorExcel(query) {
  return fetchFile({
    url: `/anchor/exportAnchor`,
    method: "get",
    params: query
  });
}

export function selectEntrustList(query) {
  return fetch({
    url: "/delegate/selectEntrustList",
    method: "get",
    params: query
  });
}

export function exportEntrust(query) {
  return fetchFile({
    url: `/delegate/exportEntrust`,
    method: "get",
    params: query
  });
}

export function visitorpage(query) {
  return fetch({
    url: "/visitorback/page",
    method: "get",
    params: query
  });
}

export function exportVisitor(query) {
  return fetchFile({
    url: `/visitorback/exportVisitor`,
    method: "get",
    params: query
  });
}

export function bannerList(query) {
  return fetch({
    url: `/banner/page`,
    method: "get",
    params: query
  });
}

export function getbanner(identifier) {
  return fetch({
    url: `/banner/selectByCode/${identifier}`,
    method: "get"
  });
}

export function submitBanner(isEdit, banner) {
  if (isEdit) {
    return updateBanner(banner);
  } else {
    return addBanner(banner);
  }
}

export function addBanner(banner) {
  return fetch({
    url: `/banner/add`,
    method: "post",
    data: banner
  });
}

export function updateBanner(banner) {
  return fetch({
    url: `/banner/update`,
    method: "post",
    data: banner
  });
}

export function updateStatus(bannerVo) {
  return fetch({
    url: `/banner/updateStatus`,
    method: "post",
    data: bannerVo
  });
}

export function deleteBanner(identifier) {
  return fetch({
    url: `/banner/deleteBanner/${identifier}`,
    method: "get"
  });
}
