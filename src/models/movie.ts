import { User } from "./users"

export interface ResponseMovie {
    page: number
    results: Movie[]
    total_pages: number
    total_results: number
  }
  
  
  
  export interface Movie {
    adult: boolean
    backdrop_path: string
    id: number
    title: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
  }

  export interface ResponseTv {
    page: number
    results: Tv[]
    total_pages: number
    total_results: number
  }
  
  export interface Tv {
    adult: boolean
    backdrop_path: string
    id: number
    name : string
    original_language: string
    original_name: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    first_air_date: string
    vote_average: number
    vote_count: number
    origin_country: string[]
  }

  export type MediaI = Movie | Tv;

//  export interface MediaAcquistato extends Movie, Tv {
//     userId: number;
//   }

export interface MediaAcquistato {
  id?: number;
  user: User
  userId: number;
  media: MediaI | MediaDetail | SimilarFilm | SimilarTv
}

  export interface ResponsePerson {
    page: number
    results: Person[]
    total_pages: number
    total_results: number
  }
  
  export interface Person {
    adult: boolean
    id: number
    name: string
    original_name: string
    media_type: string
    popularity: number
    gender: number
    known_for_department: string
    profile_path: string
    known_for: KnownFor[]
  }
  
  export interface KnownFor {
    adult: boolean
    backdrop_path: string
    id: number
    title: string
    original_language: string
    original_title: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  
  export interface MovieDetail {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: any
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  
  export interface Genre {
    id: number
    name: string
  }
  
  export interface ProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }
  
  export interface ProductionCountry {
    iso_3166_1: string
    name: string
  }
  
  export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
  }

  //
  export interface TvDetail {
    adult: boolean
    backdrop_path: string
    created_by: CreatedBy[]
    episode_run_time: any[]
    first_air_date: string
    genres: Genre[]
    homepage: string
    id: number
    in_production: boolean
    languages: string[]
    last_air_date: string
    last_episode_to_air: LastEpisodeToAir
    name: string
    next_episode_to_air: NextEpisodeToAir
    networks: Network[]
    number_of_episodes: number
    number_of_seasons: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    seasons: Season[]
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    type: string
    vote_average: number
    vote_count: number
  }
  
  export interface CreatedBy {
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string
  }
  
  export interface Genre {
    id: number
    name: string
  }
  
  export interface LastEpisodeToAir {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
  }
  
  export interface NextEpisodeToAir {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
  }
  
  export interface Network {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }
  
 
  export interface ProductionCountry {
    iso_3166_1: string
    name: string
  }
  
  export interface Season {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
  }
  
  export interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
  }

  export type MediaDetail = MovieDetail | TvDetail;

  //
  export interface VideoResponse {
    id: number
    results: Video[]
  }
  
  export interface Video {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
  }

  export interface SimilarMediaResponse {
    page: number
    results: SimilarFilm[] | SimilarTv[]
    total_pages: number
    total_results: number
  }
  
  export interface SimilarFilm {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }
  
  
  export interface SimilarTv {
    adult: boolean
    backdrop_path?: string
    genre_ids: number[]
    id: number
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path?: string
    first_air_date: string
    name: string
    vote_average: number
    vote_count: number
  }

  export interface PersonDetail {
    adult: boolean
    also_known_as: string[]
    biography: string
    birthday: string
    deathday: any
    gender: number
    homepage: string
    id: number
    imdb_id: string
    known_for_department: string
    name: string
    place_of_birth: string
    popularity: number
    profile_path: string
    movie_credits: MovieCredits
  }
  
  export interface MovieCredits {
    cast: Cast[]
    crew: Crew[]
  }
  
  export interface Cast {
    adult: boolean
    backdrop_path?: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path?: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    character: string
    credit_id: string
    order: number
  }

  export interface Crew {
    adult: boolean
    backdrop_path?: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path?: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    credit_id: string
    department: string
    job: string
  }