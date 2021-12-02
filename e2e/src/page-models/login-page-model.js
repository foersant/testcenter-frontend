import { ClientFunction, Selector, t } from 'testcafe';

class Page {
  constructor() {
    // login
    this.loginField = Selector('.root-body mat-form-field.mat-form-field:nth-child(1) input');
    this.passwordField = Selector('.root-body mat-form-field.mat-form-field:nth-child(2) input');
    this.submitLogin = Selector('mat-card-actions.mat-card-actions:nth-child(2) button:nth-child(1) span:nth-child(1)');
    this.codeInput = Selector('.mat-form-field-infix');
    this.errorMessage = Selector('mat-card.mat-card:nth-child(1) > p:nth-child(3) > b:nth-child(1)');
    this.submitCode = Selector('form.ng-dirty > mat-card-actions:nth-child(4) > button:nth-child(1)');
    this.codeError = Selector('mat-card-content:nth-child(3) > p:nth-child(2) > b');
    this.iqbLogo = Selector('.mat-tooltip-trigger');
    this.relogButton1 = Selector('button.mat-focus-indicator:nth-child(1)');
    this.relogButton2 = Selector('button.mat-focus-indicator:nth-child(2)');
    this.getLocation = ClientFunction(() => window.location.href);
    this.reloadPage = ClientFunction(() => document.location.reload());
    this.legalDisclousureButton = Selector('button.mat-focus-indicator:nth-child(2) > span:nth-child(1)');
    this.sysCheckButton = Selector('button.ng-star-inserted > span:nth-child(1)');
    this.backButton = Selector('.mat-card-actions > button:nth-child(1)');
    this.endTestButton = Selector('.mat-raised-button > span:nth-child(1)');
    this.sampleBooklet1 = Selector('button.mat-focus-indicator:nth-child(2)');
  }

  async login() {
    const continueButton = Selector('mat-card-actions:nth-child(4) > button:nth-child(1) > span:nth-child(1)')
      .withText('Weiter');
    const loginAs = Selector('div.ng-star-inserted > p:nth-child(1) > b:nth-child(1)');
    await t
      .typeText(this.loginField, 'test')
      .typeText(this.passwordField, 'user123')
      .click(this.submitLogin)
      .expect(this.getLocation())
      .eql('http://localhost:4200/#/r/code-input', { timeout: 25000 })
      .typeText(this.codeInput, 'xxx')
      .click(continueButton)
      .expect(this.getLocation())
      .eql('http://localhost:4200/#/r/test-starter', { timeout: 25000 })
      .expect(loginAs.textContent)
      .eql('Status: Angemeldet als "sample_group/test/xxx"');
  }

  async logout() {
    await t
      .click(this.iqbLogo)
      .click(this.iqbLogo)
      .click(this.endTestButton)
      .click(this.relogButton1)
      .expect(this.getLocation())
      .eql('http://localhost:4200/#/r/login/');
  }
}

export default new Page();
