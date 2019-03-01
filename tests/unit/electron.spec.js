import testWithSpectron from 'vue-cli-plugin-electron-builder/lib/testWithSpectron';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.should();
chai.use(chaiAsPromised);

describe('Application launch', function launchApplication() {
  this.timeout(30000);

  beforeEach(() => testWithSpectron().then((instance) => {
    this.app = instance.app;
    this.stopServe = instance.stopServe;
  }));

  beforeEach(() => {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness;
  });

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      this.stopServe();
    }
  });

  it('opens a window', () => this.app.client
    .getWindowCount()
    .should.eventually.have.at.least(1)
    .browserWindow.isMinimized()
    .should.eventually.be.false.browserWindow.isVisible()
    .should.eventually.be.true.browserWindow.getBounds()
    .should.eventually.have.property('width')
    .and.be.above(0)
    .browserWindow.getBounds()
    .should.eventually.have.property('height')
    .and.be.above(0));
});
