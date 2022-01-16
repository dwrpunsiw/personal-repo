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
  touchPoint: string;
  operationType: string;
  completion: string | null;
  description: string | null;
  exception?: exceptionAttrs | null;
}
