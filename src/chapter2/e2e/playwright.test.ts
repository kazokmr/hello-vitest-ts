import {afterAll, beforeAll, describe, expect, test} from "vitest";
import {Browser, chromium, firefox, webkit} from "playwright";

describe.each`
    browserType | browserName
    ${chromium} | ${"chromium"}
    ${firefox}  | ${"firefox"}
    ${webkit}   | ${"webkit"}|
`("e2e test with playwright and $browserName", ({browserType}) => {
    let browser: Browser;

    beforeAll(async () => {
        browser = await browserType.launch();
        // browser = await browserType.launch({headless: false});
    });

    afterAll(async () => {
        await browser.close();
    });

    test("a search keyword will be on the page title in google.com", async () => {

        const page = await browser.newPage();
        await page.goto("https://www.google.com/ncr");

        await page.getByRole('combobox', { name: 'Search' }).click();
        await page.getByRole('combobox', { name: 'Search' }).fill('playwright');
        await page.getByRole('combobox', { name: 'Search' }).press('Enter');

        await page.waitForURL("https://www.google.com/search?q=playwright*", {
            timeout: 5000   // 2000msだとChromiumでTimeoutになるため
        });

        expect(await page.title()).toBe("playwright - Google Search");

        await page.close();
    });
});