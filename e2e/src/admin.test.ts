import page from './page-models/admin-page-model';

fixture`Admin Test`
  .page`http://localhost:4200/#/r/login/`
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .beforeEach(async t => {
    await page.login('super', 'user123');
  });

test('Download Syscheck', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(10000)
    .click(page.workspace)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/admin/1/files')
    .click(page.tab2)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/admin/1/syscheck');
});
