import { ClientFunction, Selector, t } from 'testcafe';

class Page {
  constructor() {
    this.getLocation = ClientFunction(() => window.location.href);
    // Login
    this.loginField = Selector('.root-body mat-form-field.mat-form-field:nth-child(1) input');
    this.passwordField = Selector('.root-body mat-form-field.mat-form-field:nth-child(2) input');
    this.submitLogin = Selector('mat-card-actions.mat-card-actions:nth-child(2) button:nth-child(1) span:nth-child(1)');
    this.adminPrivilege1 = Selector('li.ng-star-inserted:nth-child(1)');
    this.adminPrivilege2 = Selector('li.ng-star-inserted:nth-child(2)');
    // Logout
    this.iqbLogo = Selector('.mat-tooltip-trigger');
    this.relogButton2 = Selector('button.mat-focus-indicator:nth-child(2)');
    this.relogButton1 = Selector('.mat-foreground > span:nth-child(1)');
    this.sysAdminButton = Selector('button.mat-foreground:nth-child(1)');
    this.tab1 = Selector('a.mat-tab-link:nth-child(1)');
    this.tab2 = Selector('a.mat-tab-link:nth-child(2)');
    this.tab3 = Selector('a.mat-tab-link:nth-child(3)');
    this.workspace = Selector('.mat-primary');
    this.newWorkspace = Selector('mat-row.mat-row:nth-child(3) > mat-cell:nth-child(2)');
    // New User
    this.addButton = Selector('button.mat-focus-indicator:nth-child(1)');
    this.newUserName = Selector('.mat-dialog-content > p:nth-child(1)');
    this.newUserPassword = Selector('.mat-dialog-content > p:nth-child(3)');
    this.submitButton = Selector('button.mat-primary > span:nth-child(1)');
    this.newUser = Selector('mat-row.mat-row:nth-child(2) > mat-cell:nth-child(2)');
    this.newUserRO = Selector('mat-checkbox > label:nth-child(1) > span:nth-child(1)').nth(3);
    this.newUserRW = Selector('mat-checkbox > label:nth-child(1) > span:nth-child(1)').nth(4);
    this.saveButton = Selector('div.ng-star-inserted:nth-child(1) > button:nth-child(2)');
    this.uploadFiles = Selector('button.mat-focus-indicator:nth-child(2)');
    // Managing users
    this.changePassword = Selector('button.mat-focus-indicator:nth-child(3)');
    this.deleteButton = Selector('button.mat-focus-indicator:nth-child(2)').nth(0);
    this.changeSuperStatus = Selector('button.mat-focus-indicator:nth-child(4)');
    this.nameDialog = Selector('.mat-dialog-content > p:nth-child(1)');
    this.passwordDialog = Selector('.mat-dialog-content > p:nth-child(2)');
    this.warning = Selector('.vertical-align-middle > span:nth-child(2)');
    this.checkboxUser = Selector('mat-checkbox > label:nth-child(1) > span:nth-child(1)').nth(1);
    this.userRO = Selector('mat-checkbox > label:nth-child(1) > span:nth-child(1) > input').nth(3);
    this.userRW = Selector('mat-checkbox > label:nth-child(1) > span:nth-child(1) > input').nth(4);
    this.superRW = Selector('mat-checkbox > label:nth-child(1) > span:nth-child(1)').nth(6);
    this.superRWInput = Selector('mat-checkbox > label:nth-child(1) > span:nth-child(1) > input').nth(6);
    this.oldWorkspace = Selector('mat-row.mat-row:nth-child(2) > mat-cell:nth-child(2)').nth(0);
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
