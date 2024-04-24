import { expect, test } from '@playwright/test';
import path from 'path'; // Import path module

const UI_URL = "http://localhost:5173/addStadium";

test.beforeEach(async ({ page }) => {
  // Your setup code here
});

// Testing the add stadium page
test("should allow user to add a stadium", async ({ page }) => {
  await page.goto(UI_URL);

  await page.locator('[name="name"]').fill('Test Stadium');
  await page.locator('[name="city"]').fill('Test CityCity');
  await page.locator('[name="country"]').fill('Test Country');
  await page.locator('[name="description"]').fill('This is description for add stadium');
  await page.locator('[name="pricePerGame"]').fill('100');
  await page.selectOption('select[name="starRating"]', "4");
  
  await page.getByText("arena").click();
  await page.getByLabel("parking").check();
  await page.getByLabel("seating capacity").check();

  await page.locator('[name="adultCount"]').fill('100');
  await page.locator('[name="childCount"]').fill('10');

  await page.setInputFiles('[name="imageFiles"]', [path.join(__dirname, "files", "image.png")]); 

  await page.getByRole("button", { name: "save" }).click();
  await expect(page.getByText("stadium saved!")).toBeVisible(); 
});

