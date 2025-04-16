import { Test, TestingModule } from '@nestjs/testing';
import { BuilderAppController } from './builder-app.controller';
import { BuilderAppService } from './builder-app.service';

describe('BuilderAppController', () => {
  let builderAppController: BuilderAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BuilderAppController],
      providers: [BuilderAppService],
    }).compile();

    builderAppController = app.get<BuilderAppController>(BuilderAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(builderAppController.getHello()).toBe('Hello World!');
    });
  });
});
