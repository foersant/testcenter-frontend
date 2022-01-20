import { } from 'testcafe';
import page from './page-models/superadmin-page-model';

fixture`Superadmin Test`
  .page`http://localhost:4200/#/r/login/`
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .beforeEach(async t => {
    await page.login('super', 'user123');
  });

test('Create new admin with read-only privileges', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(8000)
    .click(page.sysAdminButton)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users')
    .click(page.addButton)
    .typeText(page.newUserName, 'newTest')
    .typeText(page.newUserPassword, 'user123')
    .click(page.submitButton)
    .wait(5000)
    .expect(page.newUser.exists)
    .ok()
    .click(page.newUser)
    .click(page.newUserRO)
    .click(page.saveButton);
  page.logout(2);
  await t.wait(2000);
  page.login('newTest', 'user123');
  await t
    .wait(8000)
    .click(page.workspace)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/admin/1/files', { timeout: 5000 })
    .wait(5000)
    .expect(page.uploadFiles.hasAttribute('disabled'))
    .ok();
  page.logout(1);
});

test('Change password of existing user', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(8000)
    .click(page.sysAdminButton)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users')
    .wait(5000)
    .expect(page.newUser.textContent)
    .eql(' newTest ')
    .click(page.newUser)
    .click(page.changePassword)
    .typeText(page.newUserPassword, '312user')
    .click(page.submitButton);
  page.logout(2);
  await t.wait(3000);
  page.login('newTest', '312user');
  await t
    .wait(3000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter');
  page.logout(2);
});

test('Change privileges of existing admin to read-write', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(8000)
    .click(page.sysAdminButton)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users')
    .wait(8000)
    .click(page.newUser)
    .click(page.newUserRW)
    .click(page.saveButton);
  page.logout(2);
  await t.wait(3000);
  page.login('newTest', '312user');
  await t
    .expect(page.adminPrivilege1.textContent)
    .eql('Verwaltung von Testinhalten')
    .wait(8000)
    .click(page.workspace)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/admin/1/files', { timeout: 5000 })
    .wait(5000)
    .expect(page.uploadFiles.hasAttribute('disabled'))
    .notOk();
  page.logout(2);
});

test('Delete admin by clicking on the name', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(8000)
    .click(page.sysAdminButton)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users')
    .click(page.newUser)
    .click(page.deleteButton)
    .click(page.submitButton)
    .wait(8000)
    .expect(page.newUser.textContent)
    .eql(' super *');
  page.logout(2);
});

test('Create new super admin', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(8000)
    .click(page.sysAdminButton)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users')
    .click(page.addButton)
    .typeText(page.newUserName, 'newSuper')
    .typeText(page.newUserPassword, 'user123')
    .click(page.submitButton)
    .wait(5000)
    .expect(page.newUser.exists)
    .ok()
    .click(page.newUser)
    .click(page.changeSuperStatus)
    .click(page.submitButton)
    .typeText(page.passwordDialog, 'user123')
    .click(page.submitButton)
    .wait(3000)
    .expect(page.newUser.textContent)
    .eql(' newSuper *');
  page.logout(2);
  await t.wait(2000);
  page.login('newSuper', 'user123');
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .expect(page.adminPrivilege1.textContent)
    .eql('Verwaltung von Testinhalten')
    .expect(page.adminPrivilege2.textContent)
    .eql('Verwaltung von Nutzerrechten und von grundsätzlichen Systemeinstellungen');
  page.logout(2);
});

test('Change super status without correct password', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(8000)
    .click(page.sysAdminButton)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users')
    .click(page.newUser)
    .click(page.changeSuperStatus)
    .click(page.submitButton)
    .typeText(page.passwordDialog, 'wrong Password')
    .click(page.submitButton)
    .expect(page.warning.textContent)
    .eql('Fehler: Für diese Funktion haben Sie keine Berechtigung.')
    .click(page.warning);
  page.logout(2);
});

test('Change super status with correct password', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(8000)
    .click(page.sysAdminButton)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users')
    .click(page.newUser)
    .click(page.changeSuperStatus)
    .click(page.submitButton)
    .typeText(page.passwordDialog, 'user123')
    .click(page.submitButton)
    .wait(3000)
    .expect(page.newUser.textContent)
    .eql(' newSuper ');
  page.logout(2);
  await t.wait(2000);
  page.login('newSuper', 'user123');
  await t
    .expect(page.adminPrivilege1.textContent)
    .eql('Verwaltung von Testinhalten')
    .expect(page.adminPrivilege2.exists)
    .notOk();
  page.logout(1);
});

test('Add new workspace', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(8000)
    .click(page.sysAdminButton)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users')
    .click(page.tab2)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/workspaces')
    .click(page.addButton)
    .typeText(page.nameDialog, 'ws 2')
    .click(page.submitButton)
    .wait(8000)
    .expect(page.newWorkspace.textContent)
    .eql(' ws 2 ');
  page.logout(2);
});

test('Change users rights on workspace tab', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(8000)
    .click(page.sysAdminButton)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users')
    .click(page.tab2)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/workspaces')
    .expect(page.newWorkspace.textContent)
    .eql(' ws 2 ')
    .click(page.newWorkspace)
    .click(page.superRW)
    .click(page.newUserRO)
    .click(page.saveButton)
    .click(page.oldWorkspace)
    .click(page.newWorkspace)
    .expect(page.userRO.checked)
    .ok()
    .expect(page.superRWInput.checked)
    .ok();
  page.logout(2);
});

test('Delete user with checkbox', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(8000)
    .click(page.sysAdminButton)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users')
    .wait(3000)
    .expect(page.newUser.textContent)
    .eql(' newSuper ')
    .click(page.checkboxUser)
    .click(page.deleteButton)
    .click(page.submitButton)
    .wait(8000)
    .expect(page.newUser.textContent)
    .eql(' super *');
  page.logout(2);
});

test('Delete workspace', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(8000)
    .click(page.sysAdminButton)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users')
    .click(page.tab2)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/workspaces')
    .expect(page.newWorkspace.textContent)
    .eql(' ws 2 ')
    .click(page.newWorkspace)
    .click(page.deleteButton)
    .click(page.submitButton)
    .wait(8000)
    .expect(page.newWorkspace.exists)
    .notOk();
  page.logout(2);
});

test('Go to System-Admin (management window)', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(8000)
    .click(page.sysAdminButton)
    .wait(4000)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users')
    .click(page.tab2)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/workspaces')
    .click(page.tab3)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/settings')
    .click(page.tab1)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/superadmin/users');
  page.logout(2);
});

test('open workspace', async t => {
  await t
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/r/admin-starter')
    .wait(10000)
    .click(page.workspace)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/admin/1/files')
    .click(page.tab2)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/admin/1/syscheck')
    .click(page.tab3)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/admin/1/results')
    .click(page.tab1)
    .expect(page.getLocation())
    .eql('http://localhost:4200/#/admin/1/files');
  page.logout(2);
});
