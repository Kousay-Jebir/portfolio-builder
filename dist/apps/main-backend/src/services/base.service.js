"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(createDto) {
        const created = new this.model(createDto);
        return created.save();
    }
    async findAll() {
        return this.model.find().exec();
    }
    async findById(id) {
        return this.model.findById(id).exec();
    }
    async update(id, updateDto) {
        return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map