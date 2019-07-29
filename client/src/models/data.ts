export interface PostModel {
  _id?: string;
  user?: string;
  category?: string;
  title?: string;
  body?: string;
  address?: string;
  city?: string;
  state?: string
  zip?: string;
  date_created?: Date;
  comments?: [];
  location?: {type: string, coordinates: number[]};
}

export interface CategoryModel {
  _id: string;
  title: string;
}