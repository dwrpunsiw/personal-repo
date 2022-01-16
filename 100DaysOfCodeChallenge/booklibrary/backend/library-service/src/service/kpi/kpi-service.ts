import axios from "axios";
import { Kpi } from "./types/kpi-types";
import { green, red } from "colors";
import { ServiceCallError } from "../../models/exception/service-call-error";

export const insertKpi = (kpi: Kpi, serviceName: string) => {
  const kpiUrl = process.env.BASE_KPI_URL! + process.env.BASE_KPI_ENDPOINT!;
  const srvName = serviceName.toUpperCase();

  console.log(green(`[${srvName}][CALL ${kpiUrl}][START]`));
  axios({
    url: kpiUrl,
    method: "POST",
    data: kpi,
  })
    .then(() => {
      console.log(green(`[${srvName}][CALL ${kpiUrl}][SUCCESS]`));
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log(red(`[${srvName}][CALL ${kpiUrl}][FAILED]`));
        throw new ServiceCallError(
          error.response?.data.message || `Failed request call to ${kpiUrl}`,
          srvName,
          kpi
        );
      }
      throw error;
    });
};
