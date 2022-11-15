export interface IMovies {
    id?: string,
    title: string,
    imageUrl: string,
    description: string,
    director: string,
    runningTime: string,
    budgetCost: number,
    yearOfRelease: string,
    actorsId?: string[]
}

export interface IActors {
    id: string,
    imageUrl: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
}
