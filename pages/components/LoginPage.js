import { Locator, Page } from '@playwright/test'

export class LoginPage {

    constructor(page) {
       this.page = page;
       this.usernameInput = page.locator('//*[@id="user-name"]');
       this.passwordInput = page.locator('//*[@id="password"]');
       this.logButton = page.locator('#login-button')
       this.errorContainer = page.locator('.error-message-container')
    }

    async open() {
        await this.page.goto('https://www.saucedemo.com')
    }
    
    async logIn(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.logButton.click()
    }
    
}