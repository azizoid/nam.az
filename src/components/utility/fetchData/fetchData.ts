type FetchDataProps = {
  city: number;
  dd: number;
};

export type ResponseDataProps = {
  city: number;
  d: number;
  dd: number;
  hijri: string;
  m: number;
  prayers: string[];
  tarix: string;
  y: number;
  _id: string;
};

export const fetchData = async ({ city, dd }: FetchDataProps) => {
  const response = await fetch(`https://nam.az/api/${city}/${dd}`);
  return response.json();
};
