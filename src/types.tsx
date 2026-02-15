export interface IFind {
  id?: number;
  coordinate: string;
  location: string;
  img: string;
  title: string;
  description: string;
  districtId: number;
}

export interface IDistrict {
  title: string;
  polygon?: number[];
  findsCount?: number[];
  description: string;
  id?: number;
}
