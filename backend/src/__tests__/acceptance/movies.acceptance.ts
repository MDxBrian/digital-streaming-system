import {Client} from '@loopback/testlab';
import {DigitalStreamingSystemServiceApplication} from '../..';
import {MoviesRepository} from '../../repositories';
import {
  givenRunningApplicationWithCustomConfiguration,
  givenUserRepositories,
} from '../helpers';

describe('Movies Controller', () => {
  let app: DigitalStreamingSystemServiceApplication;
  let client: Client;
  let movieRepo: MoviesRepository;

  before(async () => {
    app = await givenRunningApplicationWithCustomConfiguration();
  });
  after(() => app.stop());

  before(async () => {
    ({movieRepo} = await givenUserRepositories(app));
  });

  beforeEach(async () => {
    await movieRepo.deleteAll();
  });
  // it('should fails with empty title', () => {
  //   const expectedError = 'Field title movie is required.';
  //   const title = '';
  //   expect(() => isValidName(title, 'title')).to.throw(expectedError);
  // });

  // it('should fails with empty year of release', () => {
  //   const expectedError = 'Field year of release is required.';
  //   const yearOfRelease = '';

  //   expect(() => isNotEmpty(yearOfRelease, 'yearOfRelease')).to.throw(
  //     expectedError,
  //   );
  // });

  // it('should fails with empty running time', () => {
  //   const expectedError = 'Field year of duration.';
  //   const runningTime = '';
  //   expect(() => isNotEmpty(runningTime, 'runningTime')).to.throw(
  //     expectedError,
  //   );
  // });

  // it('should fails with empty Image URL', () => {
  //   const expectedError = 'Invalid name in field Image URL';
  //   const imageUrl = '';
  //   expect(() => isNotEmpty(imageUrl, 'imageUrl')).to.throw(expectedError);
  // });
});
