import page from './page-models/syscheck-page-model';

const capabilities = {
  name: 'client side',
  'browserstack.name': 'syscheck'
};
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
fixture`Syscheck`
  .page`http://localhost:4200/#/r/login/`;

test('perform system check', async t => {
  await t
    .click(page.sysCheckButton)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/check-starter')
    .click(page.exampleSysCheck)
    // .expect(page.getLocation())
    // .eql('http://localhost:4200/#/check/1/SYSCHECK.SAMPLE/w')
    // .click(page.continueButton)
    // .expect(page.getLocation())
    // .eql('http://localhost:4200/#/check/1/SYSCHECK.SAMPLE/n')

    // .expect(page.networkText.textContent)
    // .contains('Die folgenden Netzwerkeigenschaften wurden festgestellt: Ihre Verbindung zum Testserver ist')
    .click(page.continueButton)
    .wait(12000000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/check/1/SYSCHECK.SAMPLE/u')
    .click(page.continueButton)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/check/1/SYSCHECK.SAMPLE/q')
    .typeText(page.questionareInput1, 'testInput')
    .click(page.dropdownArrow)
    .click(page.dropdownOption1)
    .typeText(page.questionareInput2, 'testInput2')
    .click(page.questionareCheckbox)
    .click(page.questionareRadioOption2)
    .click(page.continueButton)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/check/1/SYSCHECK.SAMPLE/r')
    .expect(page.summaryInput1.textContent)
    .eql(' Name: testInput ')
    .expect(page.summaryDropdown.textContent)
    .eql(' Who am I?: Harvy Dent ')
    .expect(page.summaryInput2.textContent)
    .eql(' Why so serious?: testInput2 ')
    .expect(page.summaryCheckbox.textContent)
    .eql(' Check this out: true ')
    .expect(page.summaryRadio.textContent)
    .eql(' All we here is: Radio Gugu ')
    .click(page.cancelButton)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/check-starter', { timeout: 10000 });
});
