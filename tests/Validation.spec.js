const {test, expect} = require('@playwright/test');

test("popup validations", async({page}) =>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.goto("https://www.google.com")
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden();

    //handling alert popup
    page.on('dialog',dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    const frames = page.frameLocator("#courses-iframe");
    await frames.locator("a[href*='lifetime-access']:visible").first().click();
    await frames.locator("h2 span").waitFor("visible")
    const textcheck = await frames.locator("h2 span").first().textContent()
    console.log(textcheck)
    
    
})
