// shared/base.service.ts
import { Model } from 'mongoose';

export class BaseService<T> {
  constructor(private readonly model: Model<T>) {}

  async create(createDto: Partial<T>) {
    const created = new this.model(createDto);
    return created.save();
  }

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, updateDto: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
