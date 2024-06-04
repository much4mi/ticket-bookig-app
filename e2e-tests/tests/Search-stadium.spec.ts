import { expect, test } from '@playwright/test';

const UI_URL = "http://localhost:5173/";

test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "sign in" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("mkadinali18@gmail.com");
  await page.locator("[name=password]").fill("untoldsayans");
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.getByText("Sign in successful")).toBeVisible();
});

test("should show stadium search result", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where would you like to go?").fill("kenya");
  await page.getByRole("button",{name:"search"}).click();
  await expect(page.getByText(" stadiums found in kenya")).toBeVisible();

  await expect(page.getByText("Talanta jamuhuri stadium")).toBeVisible();
});


test("should show stadium detail",async({page})=>{
  await page.goto(UI_URL);
  await page.getByPlaceholder("Where would you like to go?").fill("kenya");
  await page.getByRole("button",{name:"search"}).click();

  await page.getByText("Talanta jamuhuri stadium").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "sign in to Book" })).toBeVisible();

})