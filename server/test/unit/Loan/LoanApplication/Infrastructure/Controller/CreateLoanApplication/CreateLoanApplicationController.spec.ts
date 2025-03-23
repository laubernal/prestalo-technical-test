import {
    CreateLoanApplicationController
} from "@loan/LoanApplication/Infrastructure/Controller/CreateLoanApplication/CreateLoanApplicationController";
import {CommandBus} from "@nestjs/cqrs";
import {Response as ExpressResponse} from 'express';
import {LoanApplicationRequestMother} from "@test/unit/Loan/Mock/LoanApplicationRequestMother";
import {LoanCommandMother} from "@test/unit/Loan/Mock/LoanCommandMother";

describe('AppController', (): void => {
    let controller: CreateLoanApplicationController;
    let bus: CommandBus;

    beforeEach(async () => {
        bus = { execute: jest.fn() } as unknown as CommandBus;
        controller = new CreateLoanApplicationController(bus);
    });

    describe('CreateLoanApplicationController', (): void => {
        it('Should dispatch a CreateLoanApplicationCommand', async (): Promise<void> => {
            await controller.create(
                LoanApplicationRequestMother.standardCreateLoanApplicationRequestBody(),
                { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as  ExpressResponse
            );

            expect(bus.execute).toHaveBeenCalledTimes(1);
            expect(bus.execute).toHaveBeenCalledWith(LoanCommandMother.standardCreateLoanApplicationCommand());
        });
    });
});