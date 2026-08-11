import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/components/LoginPage'
import { InventoryPage } from '../pages/components/InventoryPage'
import { CartPage } from '../pages/components/CartPage';

test('Log in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.open();

    await loginPage.logIn('standard_user', 'secret_sauce');
    
    const title = await inventoryPage.getPageTitle();
    expect(title).toBe('Products')

    await inventoryPage.sortItems('hilo');

    await inventoryPage.inventoryItems.first().locator('//button[text()="Add to cart"]')
        .click()
    const firstItemName = await inventoryPage.inventoryItems.first()
        .locator('[data-test="inventory-item-name"]').textContent();
    await inventoryPage.openCart();
    expect(firstItemName).toBe(await cartPage.getFirstItemName())

})


