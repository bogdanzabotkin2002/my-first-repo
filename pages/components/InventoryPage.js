import { Locator, Page } from '@playwright/test'

export class InventoryPage {

    constructor(page) {
        this.page = page;
        this.buttonBurgerMenu = page.locator('#react-burger-menu-btn');
        this.cartIcon = page.locator('//*[@id="shopping_cart_container"]')
        this.addButton = page.locator('//button[text()="Add to cart"]')
        this.title = page.locator('//*[@id="header_container"]/div[2]/span');
        this.dropdown = page.locator('[data-test="product-sort-container"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
    }

    async getPageTitle() {
        return await this.title.textContent()
    }

    async sortItems(option) {
        await this.dropdown.click();
        await this.dropdown.selectOption(option);
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async addItemToCart(itemName) {
        const itemRow = this.inventoryItems.filter({ hasText: itemName });
        await itemRow.locator('button').click();
    }
}