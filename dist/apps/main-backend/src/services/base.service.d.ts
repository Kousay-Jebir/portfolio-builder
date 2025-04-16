import { Model } from 'mongoose';
export declare class BaseService<T> {
    private readonly model;
    constructor(model: Model<T>);
    create(createDto: Partial<T>): Promise<(import("mongoose").Document<unknown, {}, T> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | (import("mongoose").Document<unknown, {}, T> & {
        _id?: unknown;
    } & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    update(id: string, updateDto: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
