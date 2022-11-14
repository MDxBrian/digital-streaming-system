export interface Movies {
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

export interface Actors {
    id: string,
    imageUrl: string,
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
}
