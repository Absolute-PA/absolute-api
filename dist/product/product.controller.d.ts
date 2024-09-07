import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { FilterProductDTO } from './dtos/filter-product.dto';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getProducts(filterProductDTO: FilterProductDTO): Promise<import("./schemas/product.schema").Product[]>;
    getProduct(id: string): Promise<import("./schemas/product.schema").Product>;
    addProduct(createProductDTO: CreateProductDTO): Promise<import("./schemas/product.schema").Product>;
    updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<import("./schemas/product.schema").Product>;
    deleteProduct(id: string): Promise<any>;
}
