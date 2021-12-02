import { ClientFunction, Selector } from 'testcafe';

class Page {
  constructor() {
    this.getLocation = ClientFunction(() => window.location.href);
    this.sysCheckButton = Selector('button.ng-star-inserted > span:nth-child(1)');
    this.exampleSysCheck = Selector('button.ng-star-inserted > span:nth-child(2)');
    this.prevButton = Selector('button.mat-tooltip-trigger:nth-child(2) > span:nth-child(2)');
    this.continueButton = Selector('button.mat-focus-indicator:nth-child(3) > span:nth-child(2)');
    this.networkText = Selector('.mat-card-subtitle');
    this.questionareInput1 = Selector('#\\32');
    this.dropdownArrow = Selector('.mat-select-arrow');
    this.dropdownOption1 = Selector('#mat-option-0 > span:nth-child(1)');
    this.questionareInput2 = Selector('#\\34');
    this.questionareCheckbox = Selector('.mat-checkbox-inner-container');
    this.questionareRadioOption2 = Selector('#mat-radio-3 > label:nth-child(1) > span:nth-child(1)');
    this.summaryInput1 = Selector('.mat-card-content > ul:nth-child(7) > li:nth-child(1)');
    this.summaryDropdown = Selector('.mat-card-content > ul:nth-child(7) > li:nth-child(2)');
    this.summaryInput2 = Selector('.mat-card-content > ul:nth-child(7) > li:nth-child(3)');
    this.summaryCheckbox = Selector('.mat-card-content > ul:nth-child(7) > li:nth-child(4)');
    this.summaryRadio = Selector('.mat-card-content > ul:nth-child(7) > li:nth-child(5)');
    this.cancelButton = Selector('button.save_button:nth-child(2) > span:nth-child(1)');
  }
}

export default new Page();
