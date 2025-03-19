import { Controller, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    //@Post()
    @MessagePattern({ cmd: 'create_product'})
    create(@Payload() createProductDto) {
        return this.productsService.create(createProductDto);
    }

    // @Get()
    @MessagePattern({ cmd: 'find_all_products'})
    findAll( @Payload() paginationDto: PaginationDto ) {
        return this.productsService.findAll( paginationDto );
    }

    // @Get(':id')
    @MessagePattern({ cmd: 'find_one_product'})
    findOne(@Payload('nIdProduct', ParseIntPipe) id: number) {
        return this.productsService.findOne(id);
    }

    // @Patch(':id')
    @MessagePattern({ cmd: 'update_product'})
    update(
        //@Param('id') id: string
        // ,@Body() updateProductDto: UpdateProductDto
        @Payload() updateProductDto: UpdateProductDto
    ) {
        return this.productsService.update( updateProductDto.nIdProduct, updateProductDto );
    }

    // @Delete(':id')
    @MessagePattern({ cmd: 'delete_product' })
    remove(@Payload('nIdProduct') nIdProduct: string) {
        return this.productsService.remove(+nIdProduct);
    }

    @MessagePattern({ cmd: 'validate_products' })
    validateProducts( @Payload() ids: number[] ) {
        return this.productsService.validateProducts(ids);
    }
}
