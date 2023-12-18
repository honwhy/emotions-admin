import request2 from "@/utils/request2";
import { AxiosPromise } from "axios";
import type { ExperienceItem } from "./types";

/**
 * 获取用户情绪地图
 *
 * @param
 */
export function getUserContent(data: any): AxiosPromise<ExperienceItem[]> {
  return request2({
    url: "/experience/getContent",
    method: "post",
    data: data,
  });
}
