import { Metadata } from "next";

export class SeoUtil {
  static metadata(brand?: string) {
    const title = `${brand || "오픈프차"} | 프랜차이즈 정보분석`;
    const defaultDesc = `공정거래위원회의 가맹사업 정보공개서를 기반으로 창업 전, 프랜차이즈 본사 정보, 브랜드의 매출, 가맹점 수, 인테리어 금액, 창업 비용 정보를 편리하게 확인할 수 있습니다.`;
    const generatedDesc = `${brand}의 본사 정보, 브랜드의 매출, 가맹점 수, 인테리어 금액, 창업 비용 정보를 편리하게 확인하세요.`;
    const description = brand ? generatedDesc : defaultDesc;

    const metadata: Metadata = {
      title,
      description,
      keywords: "프랜차이즈, 가맹사업, 프랜차이즈 정보분석, 프랜차이즈 매출, 프랜차이즈 창업, 창업, 창업 비용",
      openGraph: {
        title,
        description,
        siteName: "오픈프차 | 프랜차이즈 정보분석",
        locale: "ko_KR",
        type: "website",
        url: "https://openfranchise.kr",
        images: {
          url: "/og-image.jpg",
        },
      },
      verification: {
        google: "",
        other: {
          "naver-site-verification": "",
        },
      },
    };
    return metadata;
  }
}
