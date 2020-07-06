import { browser, by, element, promise, ElementArrayFinder, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

const EC = protractor.ExpectedConditions;
const ms = 5000;

export class AppPage {
  constructor() {}

  navigateTo(url: string = '/'): promise.Promise<string> {
    browser.get(url);
    return this.urlContains(url);
  }

  urlContains(url: string): promise.Promise<string> {
    browser.wait(EC.urlContains(url), ms, 'url doesn\'t contain: ' + url);
    return browser.getCurrentUrl();
  }

  getArray(arrayFinder: ElementArrayFinder, visibilityIndex: number = 0): ElementArrayFinder {
    browser.wait(
      EC.visibilityOf(arrayFinder.get(visibilityIndex)), ms,
      'ElementArrayFinder is not visible. ' + arrayFinder.locator()
    );
    return arrayFinder;
  }

  get(finder: ElementFinder, waitForAnimation: boolean = false, clickable: boolean = false): ElementFinder {
    if (clickable) {
    browser.wait(EC.elementToBeClickable(finder), ms, 'ElementFinder is not clickable: ' + finder.locator());
    } else {
      browser.wait(EC.visibilityOf(finder), ms, 'ElementFinder is not visible. ' + finder.locator());
    }
    if (waitForAnimation) {
      browser.sleep(1500);
    }
    return finder;
  }
}
