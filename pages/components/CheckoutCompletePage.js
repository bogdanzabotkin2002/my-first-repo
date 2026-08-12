import {test, page} from '@playwright/test'

export class CompletePage {

    constructor(page) {
        this.page = page;
        this.backHomeButton = page.locator('//*[@id="back-to-products"]');
        this.pdfButton = page.locator('//*[@id="generate-pdf-order"]');
        this.completeMessage = page.locator('[data-test="complete-header"]');
    }

    async getMessage() {
        return await this.completeMessage.textContent();
    }
}