import page from './page-models/user-page-model';

fixture`Test functionalities`
  .page`http://localhost:4200/#/r/login/`
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  .beforeEach(async t => {
    await page.login();
  })
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  .afterEach(async t => {
    await page.logout();
  });

test('start a sample booklet and click through the units tabs', async t => {
  await t
    .click(page.sampleBooklet1)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/t/1/status', { timeout: 25000 })
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/t/1/u/1', { timeout: 25000 })
    .click(page.unit3)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/t/1/u/3', { timeout: 25000 })
    .click(page.unit2)
    .click(page.unit2)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/t/1/unlock', { timeout: 25000 })
    .click(page.unit1)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/t/1/u/1', { timeout: 25000 });
});

test('navigate through test units with arrow buttons', async t => {
  await t
    .click(page.sampleBooklet2)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/t/2/u/1', { timeout: 25000 })
    .expect(page.unitTitle.textContent)
    .eql('Sample Unit')
    .switchToIframe(page.iFrameUnit)
    .click(page.lastUnit)
    .switchToMainWindow()
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/t/2/u/3', { timeout: 25000 })
    .expect(page.unitTitle.textContent)
    .eql('Sample Unit again, with Alias', { timeout: 15000 })
    .switchToIframe(page.iFrameUnit)
    .click(page.firstUnit);
});
