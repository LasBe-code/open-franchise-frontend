import myFetch from "@/lib/myFetch";
import { GetInteriorReq, GetInteriorRes } from "@/types/apiTypes";
import { QueryParamsUtil } from "@/utils/queryParams";

export class InteriorService {
  static async getInterior(brandMnno: string) {
    const params: GetInteriorReq = {
      brandMnno,
    };
    const dataList = await myFetch<GetInteriorRes>({ path: QueryParamsUtil.convert("interiors", params) });
    return dataList;
  }
}
