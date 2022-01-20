import { ClientFunction, Selector, t } from 'testcafe';

class Page {
  constructor() {
    this.getLocation = ClientFunction(() => window.location.href);
    this.loginField = Selector('.root-body mat-form-field.mat-form-field:nth-child(1) input');
    this.passwordField = Selector('.root-body mat-form-field.mat-form-field:nth-child(2) input');
    this.loginContinueButton = Selector('mat-card-actions:nth-child(4) > button:nth-child(1) > span:nth-child(2)');
    this.submitLogin = Selector('mat-card-actions.mat-card-actions:nth-child(2) button:nth-child(1) span:nth-child(1)');
    this.iqbLogo = Selector('.mat-tooltip-trigger');
    this.relogButton1 = Selector('.mat-foreground > span:nth-child(2)');
    this.endTestButton = Selector('.mat-raised-button > span:nth-child(1)');

    // booklet1
    this.sampleBooklet1 = Selector('button.mat-focus-indicator:nth-child(2)');
    this.unit1 = Selector('#header > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1)');
    this.unit2 = Selector('#header > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > button:nth-child(1)');
    this.unit3 = Selector('#header > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > button:nth-child(1)');

    // booklet2
    this.sampleBooklet2 = Selector('button.mat-focus-indicator:nth-child(3)');
    this.iFrameUnit = Selector('.unitHost');
    this.unitTitle = Selector('#unit-title > p');
    this.nextUnit = Selector('#next-unit');
    this.lastUnit = Selector('#last-unit');
    this.previousUnit = Selector('#prev-unit');
    this.firstUnit = Selector('#first-unit');
  }

  async login() {
    const codeInput = Selector('.mat-form-field-infix');
    const continueButton = Selector('mat-card-actions:nth-child(4) > button:nth-child(1) > span:nth-child(1)')
      .withText('Weiter');
    const loginAs = Selector('div.ng-star-inserted > p:nth-child(1) > b:nth-child(1)');
    await t
      .typeText(this.loginField, 'test')
      .typeText(this.passwordField, 'user123')
      .click(this.submitLogin)
      .expect(this.getLocation())
      .eql('http://localhost:4200/#/r/code-input', { timeout: 25000 })
      .typeText(codeInput, 'xxx')
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
