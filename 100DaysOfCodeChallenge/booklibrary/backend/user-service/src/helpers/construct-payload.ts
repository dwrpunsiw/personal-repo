import { exceptionAttrs, Kpi } from "./../service/kpi/types/kpi-types";

export const constructKpiPayload = (
  requestId: string,
  touchPoint: string,
  routes: string,
  operationType: string,
  completion: string,
  description: string,
  exception?: exceptionAttrs
): Kpi => {
  const newKpi: Kpi = {
    requestId,
    servicename: process.env.SERVICE_NAME as string,
    version: process.env.SERVICE_VERSION as string,
    routes,
    touchPoint,
    operationType,
    completion,
    description,
    exception,
  };
  return newKpi;
};
