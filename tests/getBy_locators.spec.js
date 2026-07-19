import {test, expect} from "@playwright/test";

// test.describe.configure({mode: 'default'})
test('@Playwright Special locatores', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123")
    await page.locator('input[name="email"]').fill("Sanjay jain")
    await page.getByRole("button",{name:'Submit'}).click()
    await page.getByText("Success!").waitFor();
    await expect(page.getByText("Success!")).toBeVisible();
    await page.getByRole("link",{name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click()

});

test('@Handling to calender automation', async({page}) =>{

    const day = "15"
    const month = "5"
    const year = "2027"
    const expected_list = [day,month,year]
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__inputGroup").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.getByText(year).click()
    await page.locator(".react-calendar__tile.react-calendar__year-view__months__month").nth(Number(month-1)).click()
    await page.locator("//abbr[text()='"+day+"']").click()

    const input = page.locator(".react-date-picker__inputGroup")
    for(let i =0;i<expected_list;i++)
    {
        const value = input.nth(i).inputValue();
        expect(value).toEqual(expected_list[i])
    }



    await page.pause()

    

})