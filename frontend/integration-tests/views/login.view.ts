import { $, $$, browser, ExpectedConditions as until, by, element } from 'protractor';
import { appHost, waitForNone } from '../protractor.conf';

export const nameInput = $('#inputUsername');
export const passwordInput = $('#inputPassword');
export const submitButton = $('button[type=submit]');
export const logOutLink = $('[data-test=user-dropdown]').element(by.cssContainingText('.pf-c-app-launcher__menu-item', 'Log out'));
export const userDropdown = $('[data-test=user-dropdown] .pf-c-app-launcher__toggle');
export const pf3Login = until.presenceOf($('.login-pf'));
export const pf4Login = until.presenceOf($('[data-test-id="login"]'));

export const selectProvider = async (provider: string) => {
  const idpLink = element(by.cssContainingText('.idp', provider));
  while (!(await idpLink.isPresent())) {
    await browser.get(appHost);
    await browser.sleep(3000);
  }
  await browser.wait(until.elementToBeClickable(idpLink));
  await idpLink.click();
};

export const login = async (providerName: string, username: string, password: string) => {
  if (providerName) {
    await selectProvider(providerName);
  }
  await browser.wait(until.visibilityOf(nameInput), 60000);
  await nameInput.sendKeys(username);
  await passwordInput.sendKeys(password);
  await submitButton.click();
  await browser.wait(until.presenceOf(userDropdown), 90000);
};

export const logout = async () => {
  await browser.wait(until.elementToBeClickable(userDropdown), 90000);
  await userDropdown.click();
  await browser.wait(until.elementToBeClickable(logOutLink));
  await logOutLink.click();
  await browser.wait(until.or(pf3Login, pf4Login), 90000);
  await browser.refresh().then(() => browser.wait(waitForNone($$('.co-m-loader'))));
};
