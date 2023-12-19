import request2 from "@/utils/request2";
import { AxiosPromise } from "axios";
import type { ExperienceItem, QaAnswer } from "./types";

/**
 * 获取用户情绪地图
 * 获取系统情绪地图
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
/**
 * 获取用户列表
 * @param data
 * @returns
 */
export function getUserList(data: any): AxiosPromise<string[]> {
  return request2({
    url: "/experience/getUserList",
    method: "post",
    data: data,
  });
}
/**
 * QA问答
 * @param data
 * @returns
 */
export function getAnswer(data: any): AxiosPromise<QaAnswer> {
  return request2({
    url: "/test_qa",
    method: "post",
    data: data,
  });
}
/**
 * 业务方展示接收信息
 * @param data
 * @returns
 */
export function getContentList(data: any): AxiosPromise<ExperienceItem[]> {
  return request2({
    url: "/business/getContent",
    method: "post",
    data: data,
  });
}
/**
 * 获取模块列表
 * @param data
 * @returns
 */
export function getModList(data: any): AxiosPromise<string[]> {
  return request2({
    url: "/business/getModuleList",
    method: "post",
    data: data,
  });
}
