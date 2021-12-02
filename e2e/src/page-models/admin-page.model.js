import { ClientFunction, Selector, t } from 'testcafe';

class Page {
  constructor() {
    this.getLocation = ClientFunction(() => window.location.href);
    // Login
    this.loginField = Selector('.root-body mat-form-field.mat-form-field:nth-child(1) input');
    this.passwordField = Selector('.root-body mat-form-field.mat-form-field:nth-child(2) input');
    this.submitLogin = Selector('mat-card-actions.mat-card-actions:nth-child(2) button:nth-child(1) span:nth-child(1)');
  }

  async login(name, password) {
    await t
      .click(this.loginField)
      .pressKey('ctrl+a delete')
      .typeText(this.loginField, name)
      .typeText(this.passwordField, password)
      .click(this.submitLogin);
  }

  async logout(buttonPlacement) {
    await t
      .click(this.iqbLogo)
      .wait(3000);

    if (buttonPlacement === 1) {
      await t
        .click(this.relogButton1)
        .expect(this.getLocation())
        .eql('http://localhost:4200/#/r/login/');
    }
    if (buttonPlacement === 2) {
      await t
        .click(this.relogButton2)
        .expect(this.getLocation())
        .eql('http://localhost:4200/#/r/login/');
    }
  }
}

export default new Page();
