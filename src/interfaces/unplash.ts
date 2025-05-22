export interface IUnplash {
  id: string;
  created_at?: string;
  alt_description?: string;
  width: number;
  height: number;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  user: IUser;
  likes?: number;
  links: IUserLinks;
}

interface IUser {
  name: string;
  username: string;
  links: IUserLinks;
  profile_image: {
    medium: string;
  };
}

interface IUserLinks {
  html: string;
}
