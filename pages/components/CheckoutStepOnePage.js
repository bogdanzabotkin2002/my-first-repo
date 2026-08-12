import { test, page} from '@playwright/test'

export class CheckStepOne {

    constructor(page) {
        this.page = page;
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.zip = page.getByPlaceholder('Zip/Postal Code');
        this.continueShoppingButton = page.locator('[data-test="continue"]');
    }

    
    async fillUserInfo(firstname, lastname, zipcode) {
        await this.firstName.fill(firstname);
        await this.lastName.fill(lastname);
        await this.zip.fill(zipcode);
        await this.continueShoppingButton.click()
    }
}