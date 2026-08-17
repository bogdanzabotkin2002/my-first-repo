import { test, page} from '@playwright/test'

export class CartPage {

    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.continueShoppingButton = page.locator('//*[@id="continue-shopping"]')
        this.checkoutButton = page.locator('[data-test="checkout"]');    
    }

      async getFirstItemName() {
        return this.cartItems.first().locator('[data-test="inventory-item-name"]').textContent();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }

}