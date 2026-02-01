export interface IFind {
  id?: number;
  coordinate: string;
  location: string;
  img: string;
  title: string;
  description: string;
}

export interface IDistrict {
  name: string;
  polygon?: number[];
  finds?: number[];
  description: string;
  id?: number;
}
