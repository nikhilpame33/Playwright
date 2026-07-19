const {test,expect} = require("@playwright/test");
const site_Link = "https://rahulshettyacademy.com/client/#/auth/login"
let webContext;

test.beforeAll(async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(site_Link)
    await page.locator('#userEmail').fill("KYadav1@gmail.com")
    await page.locator('#userPassword').fill("KYadav@1")
    await page.getByRole('button',{name:'login'}).click()
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
    
    

})


test("@Client Login and Book Order", async() => {

    const product_name = 'ZARA COAT 3';
    const page = await webContext.newPage();
    const products = page.locator('.card-body')
    await page.goto(site_Link)
    await page.locator('.card-body b').last().waitFor();
    const all_item = await page.locator('.card-body b').allTextContents();
    console.log("All Product on 1st page: ",all_item)
    // Task : Place order for 'Zara Coat 3' Item
    const countP = await products.count();
    for (let i = 0; i< countP; ++i)
    {
       if ( await products.nth(i).locator("b").textContent() === product_name)
       {
        // add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
       }
    }
    await page.locator("[routerlink*=cart]").click();
    await page .locator("div li").last().waitFor();
    const bool= page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("input[value*='4542 9931 9292 2293']").fill("2598 3695 5599 4455");
    const date_drop = await page.locator("select.input.ddl")
    date_drop.first().selectOption('12');
    date_drop.last().selectOption('25')
    await page.locator("div:has-text('CVV Code') + input").fill("552");
    await page.locator("div:has-text('Name on Card ') + input").fill("Kirshna Yadav")
    await page.locator("input[placeholder*='Select Country']").pressSequentially("ind",{delay:150});
    const country = page.locator(".ta-results");
    await country.waitFor();
    console.log(await country.allTextContents())
    const num_country = await country.locator("button").count();
    let found = false
    for(let i=0;i<num_country;++i)
    {
       const text = await country.locator("button").nth(i).textContent();
        if(text ===" India") //if(text.includes(" India")) by using this might get problem when there is multiple options have 'india' word
        {
            await country.locator("button").nth(i).click()
            found = true
            break;
        }
    }
    if(!found)
    {
        console.log("Country not found")
    }

    //Use locator filtering insted of a loop
    // const country = await page.locator(".ta-results button").filter({hasText:/^ India$/}).click();


    await expect(page.locator(".user__name.mt-5 [type='text']").first()).toHaveText("KYadav1@gmail.com")
    await page.locator(".btnn.action__submit.ng-star-inserted").click()
    await expect(page.locator("div[aria-label*='Order Placed Successfully']")).toContainText("Successfully")
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID)
    await expect(page.locator("div.title:has-text('ZARA COAT 3')")).toBeVisible();

    // Ensure that order is booked
    await page.locator("[routerlink='/dashboard/myorders']").first().click()
    await page.locator("tbody").waitFor()
    const rows = await page.locator("tbody tr");
    for (let i=0; i<await rows.count();++i)
    {
        const rowOrderID = await rows.nth(i).locator("th").textContent()
        if(orderID.includes(rowOrderID))
        {
            await rows.nth(i).locator("button").first().click();
            break; 

        }
    }
    const summaryOrderId = await page.locator(".col-text").textContent()
    expect(orderID.includes(summaryOrderId)).toBeTruthy();

});
