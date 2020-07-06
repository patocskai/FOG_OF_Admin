import { promise, ElementFinder, element, by } from 'protractor';
import { AppPage } from './app.po';
import { WorkGroupPage } from './work-group.po';

export class LoginPage extends AppPage {
    constructor() {
        super();
    }

    navigateTo(): promise.Promise<string> {
        return super.navigateTo('/login');
    }

    login(email: string, password: string): WorkGroupPage {
        this.email().sendKeys(email);
        this.password().sendKeys(password);
        this.loginButton().click();
        return new WorkGroupPage();
    }

    email(): ElementFinder {
        return super.get(element(by.id('email')));
    }

    password(): ElementFinder {
       return super.get(element(by.id('password')));
    }
    loginButton(): ElementFinder {
        return super.get(element(by.id('login')));
    }

}