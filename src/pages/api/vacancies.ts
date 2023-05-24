import type { NextApiRequest, NextApiResponse } from 'next';

import { IError, IGetVacanciesResponse } from '@/types/apiSuperjobTypes';
import qs from 'qs';

export default async function handler(req: NextApiRequest, res: NextApiResponse<IGetVacanciesResponse | IError>) {
    if (req.method === 'GET') {
        try {
            const client_secret = process.env.CLIENT_SECRET || "";
            const token = process.env.TOKEN || "";
            
            const query = req.query;
            const queryParams = qs.stringify(query, { encode: false, encodeValuesOnly: true, arrayFormat: 'brackets', })
            console.log(query);
            console.log(queryParams);
            
            const url = `https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/?${queryParams}`

            const data: IGetVacanciesResponse = await fetch(url, {
                method: "GET",
                headers: { "x-secret-key": token, "X-Api-App-Id": client_secret },
            }).then((res) => res.json());
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ code: 500, message: 'failed to load data', error: ''})
        }
    }
}