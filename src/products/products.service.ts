import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { ErrorDataDto } from 'src/common/dto/errorData.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

    private readonly logger = new Logger('ProductsService');

    onModuleInit() {
        this.$connect();
        this.logger.log('Database Connected');
    }

    create(createProductDto: CreateProductDto) {
        return this.product.create({ data: createProductDto });
    }

    async findAll( paginationDto: PaginationDto ) {

        const { nPage, nLimit } = paginationDto;
        
        const nTotalPages = await this.product.count({ where: { bActivo: true }});
        const nLastPage = Math.ceil( nTotalPages / nLimit );
        
        let  errorData : ErrorDataDto | null = null;
        if ( nPage > nLastPage ){
            errorData = {
                statusCode  : 400
                ,sMessage   : 'El número de página solicitado excede el límite permitido.'
            }
        }

        return {
            data: await this.product.findMany({
                skip    : ( nPage - 1 ) * nLimit
                ,take   : nLimit
                ,where  : { bActivo: true }
            })
            ,metaData: {
                nTotal      : nTotalPages
                ,nPage      : nPage
                ,nLastPage  : nLastPage
            },
            ...(errorData && { errorData })
        }
    }

    async findOne(id: number) {
       // return this.product.findUnique({ where: {nIdProduct : id} /*, select: { nIdProduct: true, nPrice: true }*/ });
        const product = await this.product.findFirst({
            where: { nIdProduct: id, bActivo: true }
        })

        if ( !product ) {
            throw new RpcException({
                status: HttpStatus.BAD_REQUEST
                ,message: `Product with id #${ id } not found`
            });
        }

        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto) {

        const { nIdProduct: __, ... data} = updateProductDto;

        await this.findOne(id);

        return this.product.update({
            where: { nIdProduct: id }
            ,data: data
        })
    }

    async remove(id: number) {

        await this.findOne(id);

        // return this.product.delete({
        //     where: { nIdProduct: id }
        // });
        const product = await this.product.update({
            where: { nIdProduct: id}
            ,data: {
                bActivo: false
            }
        });
        return product;
    }

    async validateProducts( ids: number[]){

        ids = Array.from( new Set(ids) );

        const  products = await this.product.findMany({
            where: {
                nIdProduct: {
                    in: ids
                }
            }
        });

        if ( products.length !== ids.length ){
            throw new RpcException({
                message: 'Some products were not found'
                ,status: HttpStatus.BAD_REQUEST
            })
        }

        return products;
    }
}
