import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('//*[@id="user-name"]').fill('standard_user');
  await page.locator('//*[@id="password"]').fill('secret_sauce');
  await page.locator('//*[@id="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test ('login_locked_out', async({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('//*[@id="user-name"]').fill('locked_out_user');
  await page.locator('//*[@id="password"]').fill('secret_sauce');
  await page.locator('//*[@id="login-button"]').click();
  await expect(page.getByText("Epic sadface: Sorry, this user has been locked out.")).toBeVisible();
});

