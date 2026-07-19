const { test, expect, request } = require('@playwright/test');


test("@Client Login and Book Order", async({page}) => {

    const product_name = 'ZARA COAT 3';
    const products = page.locator('.card-body')
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator('#userEmail').fill("KYadav1@gmail.com")
    await page.locator('#userPassword').fill("KYadav@1")
    await page.getByRole('button',{name:'login'}).click()
    //await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').last().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=640f0e7c1d2b3a0015f8c9d6"}));
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this")

});