
export interface PropertyBasicType {
    _id: string,
    id: string
    name: string;
    price: number;
}

export interface PropertyType {
    _id: string,
    id: string
    name: string;
    location: string;
    area: number;
    price: number;
    overview: string;
    why: string;
    what: string;
    landmark: {
        airpot: { name: string; distance: number; }[];
        highway: { name: string; distance: number; }[];
    };
    map: string;
    category: number;
}