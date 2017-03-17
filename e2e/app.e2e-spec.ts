import { RechnungstoolPage } from './app.po';

describe('rechnungstool App', () => {
  let page: RechnungstoolPage;

  beforeEach(() => {
    page = new RechnungstoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
