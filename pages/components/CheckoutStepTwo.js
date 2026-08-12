import {test, page} from '@playwright/test'

export class CheckStepTwo {

    constructor(page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.finishButton = page.locator('//*[@id="finish"]');
        this.cancelButton = page.locator('//*[@id="cancel"]');
        this.totalSum = page.locator('//*[@id="checkout_summary_container"]/div/div[2]/div[8]')
    }

    async finish() {
        await this.finishButton.click();
    }
}