import axios from "axios";
import { Kpi } from "./types/kpi-types";
import { green, red } from "colors";
import { ServiceCallError } from "../../models/exception/service-call-error";

export const insertKpi = (kpi: Kpi) => {
  const kpiUrl = process.env.BASE_KPI_URL! + process.env.BASE_KPI_ENDPOINT!;

  console.log(green(`[AUTH SERVICE][CALL ${kpiUrl}][START]`));
  axios({
    url: kpiUrl,
    method: "POST",
    data: kpi,
  })
    .then(() => {
      console.log(green(`[AUTH SERVICE][CALL ${kpiUrl}][SUCCESS]`));
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log(red(`[AUTH SERVICE][CALL ${kpiUrl}][FAILED]`));
        throw new ServiceCallError(
          error.response?.data.message || `Failed request call to ${kpiUrl}`
        );
      }
      throw error;
    });
};
