import { expect, test } from '@playwright/test';
import path from 'path';

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL + "addStadium");

  await page.getByRole("link", { name: "sign in" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("kmainoo@gmail.com");
  await page.locator("[name=password]").fill("manchester");
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page.getByText("Sign in successful")).toBeVisible();
});

test("should allow the user to display stadium", async ({ page }) => {
  await page.goto(`${UI_URL}stadium`);

  await expect(page.getByText("My stadium")).toBeVisible();
  await expect(page.getByText("Talanta jamuhuri stadium")).toBeVisible();
  await expect(page.getByText("This is description for add stadium in kenya to hold AFCON games")).toBeVisible();

  const stadiumDetails = [
    { text: 'nairobi,Kenya', index: 0 },
    { text: 'capacity 60000', index: 0 },
    { text: 'arena', index: 0 },
    { text: '$100 per game', index: 0 },
    { text: '2344 adults, 102 children', index: 0 },
    { text: '4', index: 0 },
  ];

  for (const detail of stadiumDetails) {
    await expect(page.locator(`text=${detail.text}`).nth(detail.index)).toBeVisible();
  }

  // Select the specific "view detail" link for a stadium
  const viewDetailLink = page.locator('div:has-text("Talanta jamuhuri stadium")').locator('a', { hasText: 'view detail' });
  

  const addStadiumLink = page.locator('a', { hasText: 'Add stadium' });
  await expect(addStadiumLink).toBeVisible();
});