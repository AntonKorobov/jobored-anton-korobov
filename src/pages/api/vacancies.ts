import type { NextApiRequest, NextApiResponse } from "next";

import { IError, IGetVacanciesResponse } from "@/types/apiSuperjobTypes";
import qs from "qs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IGetVacanciesResponse | IError>
) {
  if (req.method === "GET") {
    try {
      const client_secret = process.env.CLIENT_SECRET || "";
      const token = process.env.TOKEN || "";

      console.log("queryBasic: ", req.query);
      const arrayOfIds = req.query.ids
        ? req.query.ids.toString().split(",")
        : "";
      req.query.ids = arrayOfIds;
      console.log("queryChanged: ", req.query);

      const queryParams = qs.stringify(req.query, {
        encodeValuesOnly: true,
        arrayFormat: "brackets",
      });
      // const queryParams = req.url ? req.url.split("?")[1] : "";
      // const decodedQueryParams = decodeURI(queryParams);

      const url = `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies?${queryParams}`;
      console.log("queryParams", queryParams);
      // console.log("decodedQueryParams---", decodedQueryParams);
      console.log("url: ", url);

      const data: IGetVacanciesResponse = await fetch(url, {
        method: "GET",
        headers: { "x-secret-key": token, "X-Api-App-Id": client_secret },
      }).then((res) => res.json());
      res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ code: 500, message: "failed to load data", error: "" });
    }
  }
}
