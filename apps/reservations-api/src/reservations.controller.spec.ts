import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

describe('ReservationsController', () => {
  const mockReservation: CreateReservationDto = {
    startDate: new Date('2024-03-04T16:41:28.199Z'),
    endDate: new Date('2024-03-14T16:41:28.199Z'),
    placeId: 'place-id:123',
    invoiceId: 'invoice-id:123123',
  };

  const mockReservationService = {
    create: jest.fn().mockReturnValue(mockReservation),
    findAll: jest.fn().mockReturnValue([mockReservation]),
    findOne: jest.fn().mockReturnValue(mockReservation),
    update: jest.fn().mockReturnValue(mockReservation),
    delete: jest.fn().mockReturnValue(mockReservation),
  };

  let controller: ReservationsController;
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        {
          provide: ReservationsService,
          useValue: mockReservationService,
        },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create', async () => {
    const expectedOutput = await controller.create(mockReservation);
    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(mockReservation);
    expect(expectedOutput).toEqual(mockReservation);
  });
});
