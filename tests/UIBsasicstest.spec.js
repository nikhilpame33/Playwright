const {test, expect} = require('@playwright/test');

// test('First playwrite test',async ({browser}) =>
//     {

//     // chrome - plugins/ cookies
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
//     console.log(await page.title());
// });

// test('Page playwrite test',async ({page}) =>
//     {

//     // // chrome - plugins/ cookies
//     await page.goto("https://www.google.com"); 
//     //get title  - assertion
//     console.log(await page.title());
//     await expect(page).toHaveTitle("Google")

// });

test('login page', async ({page}) => {
    
    const product_names = page.locator('.card-body a ')
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    // console.log(await page.title())
    //CSS
    const documentLink = page.locator("href*=[https://rahulshettyacademy.com/'documents-request']")
    await page.locator('#username').fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("input[value='admin']").click();
    await page.locator("select.form-control").selectOption("stud");
    await expect(documentLink).toHaveAttribute("class","blinkingText");
    await page.locator('#signInBtn').click();
    // await page.pause()
    // await page.waitForTimeout(3000);
    // console.log (await page.locator("[style*='block']").textContent())
   // await expect(page.locator("[style*='block']")).toContainText('username')
    
    await expect(page.locator('a').filter({ hasText: 'ProtoCommerce' }).first()).toContainText('ProtoCommerce')
    console.log("2nd product: ", await product_names.nth(1).textContent());
    console.log("1st product: ", await product_names.first().textContent());
    const allproduct = await product_names.allTextContents()
    console.log(allproduct)

})

test('@Child windows handaling', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentLink = page.locator('a[href*="documents-request"]')
    
    const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'), // listen for any new page pending, rejected, fulfilled
        documentLink.click(),]//new page opened
     )
    
     const text = await newPage.locator(".red").textContent()
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
     console.log(text)
     console.log(domain)

    

})