export interface Movie {
    id: number
    title: string
    release_date: string
    popularity: number
    overview: string
    vote_average: number
    vote_count: number
    adult: boolean
    genre_ids: number[]
    src: string
}

export interface Genre {
    id: number
    name: string
}
