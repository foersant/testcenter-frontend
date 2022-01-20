import page from './page-models/login-page-model';

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
fixture`Login Page basic functionality`
  .page`http://localhost:4200/#/r/login/`;

test('login and relog test user with login code', async t => {
  await t
    .typeText(page.loginField, 'test')
    .typeText(page.passwordField, 'user123')
    .click(page.submitLogin)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/code-input', { timeout: 25000 })
    .typeText(page.codeInput, 'xxx')
    .click(page.submitCode)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/test-starter', { timeout: 25000 })
    .click(page.relogButton1);
});

test('login test user with wrong login code', async t => {
  await t
    .typeText(page.loginField, 'test')
    .typeText(page.passwordField, 'user123')
    .click(page.submitLogin)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/code-input', { timeout: 25000 })
    .typeText(page.codeInput, 'zzz')
    .click(page.submitCode)
    .expect(page.codeError.textContent)
    .eql('Der Code ist leider nicht gültig. Bitte noch einmal versuchen')
    .click(page.relogButton1)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/login/', { timeout: 25000 });
});

test('login and relog test user', async t => {
  await t
    .typeText(page.loginField, 'test-demo')
    .typeText(page.passwordField, 'user123')
    .click(page.submitLogin)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/test-starter', { timeout: 25000 })
    .click(page.relogButton1)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/login/', { timeout: 25000 });
});

test('login and relog admin', async t => {
  await t
    .typeText(page.loginField, 'super')
    .typeText(page.passwordField, 'user123')
    .click(page.submitLogin)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter', { timeout: 25000 })
    .click(page.relogButton2)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/login/', { timeout: 25000 });
});

test('get to legal disclosure and return to login page', async t => {
  await t
    .click(page.legalDisclousureButton)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/legal-notice', { timeout: 25000 })
    .click(page.backButton)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/login/', { timeout: 25000 });
});

test('get to systemcheck and return to login page', async t => {
  await t
    .click(page.sysCheckButton)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/check-starter', { timeout: 25000 })
    .click(page.backButton)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/login/', { timeout: 25000 });
});

test('login with no password', async t => {
  await t
    .typeText(page.loginField, 'test-no-pw')
    .click(page.submitLogin)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/test-starter')
    .click(page.relogButton1);
});

test('login with wrong credentials', async t => {
  await t
    .typeText(page.loginField, 'test')
    .typeText(page.passwordField, 'wrongpassword')
    .click(page.submitLogin)
    .expect(page.errorMessage.textContent)
    .eql('Anmeldedaten sind nicht gültig. Bitte noch einmal versuchen!', { timeout: 25000 });
});

test('login with expired credentials', async t => {
  await t
    .typeText(page.loginField, 'test-expired')
    .typeText(page.passwordField, 'user123')
    .click(page.submitLogin)
    .expect(page.errorMessage.textContent)
    .eql('Anmeldedaten sind abgelaufen', { timeout: 25000 });
});

test('login with not activated login credentials', async t => {
  await t
    .typeText(page.loginField, 'test-future')
    .typeText(page.passwordField, 'user123')
    .click(page.submitLogin)
    .expect(page.errorMessage.textContent)
    .eql('Anmeldung abgelehnt. Anmeldedaten sind noch nicht freigeben.', { timeout: 25000 });
});
