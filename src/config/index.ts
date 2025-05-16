import dotenv from "dotenv";
dotenv.config();
export const config = {
  unsplash: {
    apiUrl: process.env.API_URL || "https://api.unsplash.com",
    apiKey: process.env.API_KEY || "RNK_QDDJzZm_9BIFw04b0swgRydz3pyJNFp45UxG0zE",
    searchPhotos: "/search/photos",
    getPhotos: "/photos",
    getPhoto: "/photos/:id",
    perPage: 20,
  },
};