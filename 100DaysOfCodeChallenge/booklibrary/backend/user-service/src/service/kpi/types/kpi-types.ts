export interface exceptionAttrs {
  exceptionName: string;
  exceptionDescription: string;
  exceptionCode: string;
  exceptionStatus: string;
}

export interface Kpi {
  requestId: string;
  servicename: string;
  version: string;
  routes: string;
  operationType: string;
  completion: string;
  description: string;
  exception?: exceptionAttrs;
}
