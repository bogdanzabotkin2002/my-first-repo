import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/components/LoginPage'
import { InventoryPage } from '../pages/components/InventoryPage'
import { CartPage } from '../pages/components/CartPage';
import { CheckStepOne } from '../pages/components/CheckoutStepOnePage';
import { CheckStepTwo } from '../pages/components/CheckoutStepTwo';
import { CompletePage } from '../pages/components/CheckoutCompletePage';

test('login -> finish test', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkstepOne = new CheckStepOne(page);
    const checkstepTwo = new CheckStepTwo(page);
    const completePage = new CompletePage(page);

    await loginPage.open();

    await loginPage.logIn('standard_user', 'secret_sauce');

    const title = await inventoryPage.getPageTitle();
    expect(title).toBe('Products');

    await inventoryPage.sortItems('hilo');

    await inventoryPage.inventoryItems.first()
    await addButton.click();
    const firstItemName = await inventoryPage.inventoryItems.first()
        .locator('[data-test="inventory-item-name"]').textContent();
    await inventoryPage.openCart();
    expect(firstItemName).toBe(await cartPage.getFirstItemName());

    await cartPage.goToCheckout();
    await checkstepOne.fillUserInfo('Test', '12345', '222720');
    expect(await checkstepTwo.title.textContent()).toBe('Checkout: Overview');

    await checkstepTwo.finish();
    const successMessage = await completePage.getMessage();
    expect(successMessage).toBe('Thank you for your order!');
})


