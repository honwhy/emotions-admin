import request2 from "@/utils/request2";
import { AxiosPromise } from "axios";
import type { ExperienceItem, QaAnswer, ModuleInfo, DataObject } from "./types";

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
    url: "/user_qa",
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
export function getModList(data: any): AxiosPromise<ModuleInfo[]> {
  return request2({
    url: "/business/getModuleList",
    method: "post",
    data: data,
  });
}
/**
 * 推送数据到业务系统
 * @param data
 * @returns
 */
export function pushContent(data: any): AxiosPromise<string> {
  return request2({
    url: "/business/pushContent",
    method: "post",
    data: data,
  });
}

/**
 *
 * @param data
 * @returns
 */
export function getFlowPathList(data: any): AxiosPromise<string[]> {
  return request2({
    url: "/experience/getFlowPathList",
    method: "post",
    data: data,
  });
}

export function getData(data: any): AxiosPromise<DataObject> {
  return request2({
    url: "/get/data",
    method: "post",
    data: data,
  });
}
