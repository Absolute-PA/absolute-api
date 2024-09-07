import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDTO } from './dtos/create-product.dto';
import { FilterProductDTO } from './dtos/filter-product.dto';
export declare class ProductService {
    private readonly productModel;
    private readonly logger;
    constructor(productModel: Model<ProductDocument>);
    getFilteredProducts(filterProductDTO: FilterProductDTO): Promise<Product[]>;
    getAllProducts(): Promise<Product[]>;
    getProduct(id: string): Promise<Product>;
    addProduct(createProductDTO: CreateProductDTO): Promise<Product>;
    updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<Product>;
    deleteProduct(id: string): Promise<any>;
}
