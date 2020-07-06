import { LoginPage } from '../pages/login.po';
import { browser } from 'protractor';
import { url } from 'inspector';

fdescribe('Login Page', () => {
  // tslint:disable-next-line: prefer-const
  let loginPage = new LoginPage();

  beforeAll(() => {
    browser.driver.manage().window().maximize();
    // tslint:disable-next-line: deprecation
    browser.ignoreSynchronization = true;
  });

  beforeEach(() => {
    loginPage.navigateTo();
  });

  it('should successfully login the user', async () => {
       let user = loginPage.login('pr2@prmail.com', '123456');
       browser.sleep(3000);
  });
});
