import {Module} from '@nestjs/common';
import {
    CreateLoanApplicationCommandHandler
} from "@loan/LoanApplication/Application/CreateLoanApplication/CreateLoanApplicationCommandHandler";
import {CqrsModule} from "@nestjs/cqrs";
import {
    CreateLoanApplicationController
} from "@loan/LoanApplication/Infrastructure/Controller/CreateLoanApplication/CreateLoanApplicationController";
import {
    MongooseLoanApplicationRepository
} from "@loan/LoanApplication/Infrastructure/Persistance/MongooseLoanApplicationRepository";
import {ConfigModule} from "@nestjs/config";
import {MongooseDatabaseModule} from "@shared/Infrastructure/Persistance/MongooseDatabaseModule";

const Controllers = [CreateLoanApplicationController];

const Handlers = [CreateLoanApplicationCommandHandler]

const Repositories = [
    {
        provide: 'ILoanApplicationRepository',
        useClass: MongooseLoanApplicationRepository,
    }
]

@Module({
    imports: [CqrsModule, ConfigModule.forRoot({isGlobal: true}), MongooseDatabaseModule],
    controllers: [...Controllers],
    providers: [...Handlers, ...Repositories],
})
export class AppModule {
}
