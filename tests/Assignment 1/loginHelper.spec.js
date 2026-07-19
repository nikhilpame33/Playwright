const {test,expect} = require("@playwright/test");

test("@login page", async({page, username, password}) =>
{
    await page.goto("https://eventhub.rahulshettyacademy.com")

    await page.getByPlaceholder('you@email.com').fill(username);
    await page.getByLabel('Password').fill(password);
    await page.locator("#login-btn").click()
    await page.locator("#nav-home").waitFor()
    await expect (page.locator("#nav-home").isVisible())
    
})