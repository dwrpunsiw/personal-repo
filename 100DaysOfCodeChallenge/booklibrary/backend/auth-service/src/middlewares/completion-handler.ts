import { green, red } from "colors";
import { ServiceCallError } from "../models/exception/service-call-error";
import { insertKpi } from "../service/kpi/kpi-service";
import { Kpi } from "../service/kpi/types/kpi-types";

export const onCompletion = async (serviceName: string, kpi: Kpi) => {
  try {
    console.log(green(`[${serviceName}][INSERT KPI][START]`));
    await insertKpi(kpi, serviceName);
    console.log(green(`[${serviceName}][INSERT KPI][SUCCESSFULLY INSERT KPI]`));
  } catch (error) {
    if (error instanceof ServiceCallError) {
      console.log(
        red(`[${serviceName}][INSERT KPI][UNSUCCESSFULLY INSERT KPI]`)
      );
      throw error;
    }
  }
};
