import {givenHttpServerConfig} from '@loopback/testlab';
import {DigitalStreamingSystemServiceApplication} from '..';
import {Actors, Movies, Reviews} from '../models';
import {MoviesRepository, UsersRepository} from '../repositories';

export async function givenRunningApplicationWithCustomConfiguration() {
  const app = new DigitalStreamingSystemServiceApplication({
    rest: givenHttpServerConfig(),
  });

  await app.boot();

  app.bind('datasources.config.mongodb').to({
    name: 'mongodb',
    connector: 'mongodb',
  });

  await app.start();
  return app;
}

export async function givenUserRepositories(
  app: DigitalStreamingSystemServiceApplication,
) {
  const userRepo = await app.getRepository(UsersRepository);
  const movieRepo = await app.getRepository(MoviesRepository);
  return {movieRepo, userRepo};
}

export function mockActor(actor?: Partial<Actors>) {
  const data = Object.assign(
    {
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      age: 12,
      imageUrl:
        'https://th.bing.com/th/id/OIP.Q_oBD9X5pJ7JePXexJk0nQHaDg?pid=ImgDet&rs=1',
    },
    actor,
  );
  return new Actors(data);
}

export function mockMovie(movie?: Partial<Movies>) {
  const data = Object.assign(
    {
      title: 'Title',
      description: 'This is a description',
      budgetCost: 10000,
      yearOfRelease: '2022',
      runningTime: '100 mins',
      director: 'Director',
      imageUrl:
        'https://th.bing.com/th/id/OIP.Q_oBD9X5pJ7JePXexJk0nQHaDg?pid=ImgDet&rs=1',
      actorIds: ['636defd74a5f2a3f7c2cd9db'],
    },
    movie,
  );
  return new Movies(data);
}

export function givenReview(review?: Partial<Reviews>) {
  const data = Object.assign(
    {
      rate: 5,
      content: 'This is a review',
      date: '2022-05-11',
      status: 'APPROVED',
      movieId: '635e2a561fd72a3b343f1576',
      userId: '636c6b5a6861ba21acb89047',
    },
    review,
  );
  return new Reviews(data);
}
