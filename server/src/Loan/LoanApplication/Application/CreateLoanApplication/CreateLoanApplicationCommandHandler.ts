import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {
    CreateLoanApplicationCommand
} from "@loan/LoanApplication/Application/CreateLoanApplication/CreateLoanApplicationCommand";
import {Id} from "@shared/Domain/ValueObject/Id";
import {Name} from "@shared/Domain/ValueObject/Name";
import {EmailVo} from "@shared/Domain/ValueObject/EmailVo";
import {LoanApplication} from "@loan/LoanApplication/Domain/Entity/LoanApplication";
import {AmountRequested} from "@shared/Domain/ValueObject/AmountRequested";
import {TermInMonths} from "@shared/Domain/ValueObject/TermInMonths";
import {MonthlyIncome} from "@shared/Domain/ValueObject/MonthlyIncome";
import {Inject} from "@nestjs/common";
import {ILoanApplicationRepository} from "@loan/LoanApplication/Domain/Repository/ILoanApplicationRepository";

@CommandHandler(CreateLoanApplicationCommand)
export class CreateLoanApplicationCommandHandler implements ICommandHandler<CreateLoanApplicationCommand> {
    constructor(@Inject('ILoanApplicationRepository') private readonly repository: ILoanApplicationRepository) {
    }

    public async execute(command: CreateLoanApplicationCommand): Promise<void> {
        const id = new Id(command.id);
        const name = new Name(command.name);
        const email = new EmailVo(command.email);
        const amountRequested = new AmountRequested(command.amountRequested);
        const termInMonths = new TermInMonths(command.termInMonths);
        const monthlyIncome = new MonthlyIncome(command.monthlyIncome);
        const createdAt = new Date();
        const updatedAt = new Date();

        const loanApplication = new LoanApplication(
            id,
            name,
            email,
            amountRequested,
            termInMonths,
            monthlyIncome,
            createdAt,
            updatedAt
        );

        await this.repository.save(loanApplication);
    }
}