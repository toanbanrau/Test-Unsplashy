export interface IUnplash {
  id: string;
  created_at?: string; 
  alt_description?: string; 
  urls: {
    small: string;
    regular: string; 
    full: string;
  };
  user: {
    name: string; 
    username: string; 
    links: IUserLinks; 
  };
  likes?: number; 
}

export interface IUserLinks {
  html: string;
}
