import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';
import { AbstractDocument } from './abstract.module';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {

    protected abstract readonly logger: Logger;

    constructor(protected readonly model: Model<TDocument>){}

    async create(document: Omit<TDocument, '_id'>):Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId()
        });

       return  (await createdDocument.save()).toJSON() as unknown as TDocument;
    }


    async findOne(filterQuery: FilterQuery<TDocument> ): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, {lean: true}).exec();

        if(!document) {
            this.logger.warn("Document not found with filter: ", filterQuery);
            throw new NotFoundException('Document not found');
        }

        return document

    }

}   