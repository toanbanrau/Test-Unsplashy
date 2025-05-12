import { Movie } from "@/interface/movie";


export const data:Movie[] = [
  { 
    id:1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    director: "Christopher Nolan",
    duration: 148,
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    ratings: [8.8, 9.0, 8.7],
    languages: ["English", "Japanese", "French"],
    availableOn: ["Netflix", "Amazon Prime", "HBO Max"],
    reviews: [
      { user: "Alice", comment: "Mind-blowing!", score: 9.5 },
      { user: "Bob", comment: "A bit complex but great visuals", score: 8.7 }
    ],
    awards: ["Oscar for Best Cinematography", "BAFTA for Best Production Design"],
    isAvailable: true,
    tags: ["mind-bending", "dreams", "heist"]
  },
  {
    id:2,
    title: "Parasite",
    year: 2019,
    genre: "Thriller",
    director: "Bong Joon Ho",
    duration: 132,
    description: "A poor family schemes to become employed by a wealthy household by infiltrating their lives.",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    ratings: [8.6, 9.1, 8.9],
    languages: ["Korean", "English"],
    availableOn: ["Hulu", "Amazon Prime"],
    reviews: [
      { user: "Charlie", comment: "A masterpiece", score: 9.8 },
      { user: "Dana", comment: "Very clever social commentary", score: 9.2 }
    ],
    awards: ["Oscar for Best Picture", "Golden Globe for Best Foreign Film"],
    isAvailable: true,
    tags: ["class divide", "dark comedy", "Korean cinema"]
  },
  {
    id:3,
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    director: "Francis Ford Coppola",
    duration: 175,
    description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    ratings: [9.2, 9.4, 9.1],
    languages: ["English", "Italian", "Latin"],
    availableOn: ["Paramount+", "Apple TV"],
    reviews: [
      { user: "Eve", comment: "Classic and powerful", score: 9.9 },
      { user: "Frank", comment: "Timeless storytelling", score: 9.5 }
    ],
    awards: ["Oscar for Best Picture", "Golden Globe for Best Director"],
    isAvailable: true,
    tags: ["mafia", "classic", "family drama"]
  },

];