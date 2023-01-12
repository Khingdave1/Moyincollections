import { ICategory } from "./category";

export interface IProduct {
    id?: string;
    name?: string;
    description?: string;
    imageUrl?: string;
    categories?: Array<ICategory>;
    dateAdded?: string;
    lastUpdated?: string;
    status?: string;
    price?: number;
    discountPrice?: number;
    totalQuantity?: number;
}
