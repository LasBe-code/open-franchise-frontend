import { test, expect } from "@playwright/test";

test.describe("메인 페이지 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });
  test("랭크 요소 테스트", async ({ page }) => {
    const rankTitleList = page.locator("#rank-title");
    const rankItemList = page.locator("#rank-item");
    const firstRankTitle = rankTitleList.first();
    const firstRankItem = rankItemList.first();

    await test.step("랭크 타이틀 존재 여부", async () => {
      const titleLocator = firstRankTitle.locator("text=/.*\\sTOP10/i");
      await expect(titleLocator).toBeVisible();
    });

    await test.step("랭크 아이템 클릭시 페이지 이동 여부", async () => {
      const firstRankItemBrandName = await firstRankItem.locator("p").nth(2).innerText();
      await firstRankItem.click();
      await expect(page).toHaveURL(`/brand/${firstRankItemBrandName}`);
    });
  });
});

test.describe("검색 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  const brand = "교촌치킨";

  test("검색 기능 렌더 테스트", async ({ page }) => {
    const header = page.locator("header");
    const search = header.locator("#search");
    const input = search.locator("input");

    await test.step("검색창 존재 여부", async () => {
      await expect(search).toBeVisible();
    });

    await test.step("검색창 텍스트 입력시 연관 브랜드 표시 여부", async () => {
      await input.click();
      await input.fill(brand);
      await page.waitForTimeout(3000);
      const buttonList = search.locator("button");
      const searchResult = buttonList.nth(1);
      await expect(searchResult).toHaveText(brand);
    });
  });

  test("검색 기능 페이지 이동 테스트", async ({ page }) => {
    const header = page.locator("header");
    const search = header.locator("#search");
    const input = search.locator("input");

    await test.step("검색창 텍스트 입력 후 연관 검색어 클릭시 브랜드 페이지 이동 여부", async () => {
      await input.click();
      await input.fill(brand);
      await page.waitForTimeout(3000);
      const buttonList = search.locator("button");
      const searchResult = buttonList.nth(1);
      await searchResult.click();
      await expect(page).toHaveURL(`/brand/${brand}`);
    });

    await test.step("검색창 텍스트 입력 후 검색 버튼 클릭시 검색 페이지 이동 여부", async () => {
      await input.click();
      await input.clear();
      await input.fill(brand);
      await page.waitForTimeout(3000);
      const buttonList = search.locator("button");
      const searchButton = buttonList.nth(0);
      await searchButton.click();
      await expect(page).toHaveURL(`/search?name=${brand}`);
    });
  });
});
