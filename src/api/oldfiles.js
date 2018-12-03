import fetch from "@/utils/fetch";

/**
 * 附件类型
 */
export function getAttachmentType() {
  return fetch({
    url: "/data/getAttachmentType",
    method: "get"
  });
}
