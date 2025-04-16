import { Test, TestingModule } from '@nestjs/testing';
import { ConsultAppController } from './consult-app.controller';
import { ConsultAppService } from './consult-app.service';

describe('ConsultAppController', () => {
  let consultAppController: ConsultAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConsultAppController],
      providers: [ConsultAppService],
    }).compile();

    consultAppController = app.get<ConsultAppController>(ConsultAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(consultAppController.getHello()).toBe('Hello World!');
    });
  });
});
