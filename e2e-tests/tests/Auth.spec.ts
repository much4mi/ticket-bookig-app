import { test, expect } from '@playwright/test';

const UI_URL="http://localhost:5173/";

test('should allow user to sign in', async ({ page }) => {
  await page.goto(  UI_URL);

  //get sign in
  await page.getByRole("link",{name: "sign in"}).click();
  await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible() ;
  await page.locator("[name=email]").fill("kmainoo@gmail.com");
  await page.locator("[name=password]").fill("manchester");
  await page.getByRole("button",{name:"Log In"}).click();
  await expect(page.getByText("Sign in successful",)).toBeVisible() ;
  await expect(page.getByRole("link",{name:"My booking"})).toBeVisible() ;
  await expect(page.getByRole("link",{name:"stadium"})).toBeVisible() ;
  
});

test("should allow user to register",async({page})=>{
  const testEmail = `test_register_${Math.floor(Math.random() * 9000) + 10000}@test.com`;

  await page.goto(  UI_URL);
  await page.getByRole("link",{name: "sign in"}).click();
  await page.getByRole("link",{name: "Create an account here"}).click();
  await  expect(page.getByRole("heading",{name: "Create Account"})).toBeVisible();
  await page.locator("[name=firstName]").fill("bensoh");
  await page.locator("[name=lastName]").fill("bener");
  await page.locator("[name=email]").fill("ben10234@gmail.com");
  await page.locator("[name=password]").fill("123456789");
  await page.locator("[name=confirmPassword]").fill("123456789");
  await page.getByRole("button",{name:"Create Account"}).click();
  await expect(page.getByText("registration  successful",)).toBeVisible() ;
  await expect(page.getByRole("link",{name:"My booking"})).toBeVisible() ;
  await expect(page.getByRole("link",{name:"stadium"})).toBeVisible() ;
  await expect(page.getByRole("link",{name:"sign out"})).toBeVisible() ;


})