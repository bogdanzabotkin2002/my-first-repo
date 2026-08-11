import { test, page} from '@playwright/test'

export class CartPage {

    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

      async getFirstItemName() {
        return await this.cartItems.first().locator('[data-test="inventory-item-name"]').textContent();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
  }

}