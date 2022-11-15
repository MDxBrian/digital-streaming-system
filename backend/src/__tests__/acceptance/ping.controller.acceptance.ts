import {Client} from '@loopback/testlab';
import {DigitalStreamingSystemServiceApplication} from '../..';
import {setupApplication} from './test-helper';

describe('PingController', () => {
  let app: DigitalStreamingSystemServiceApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });
});
