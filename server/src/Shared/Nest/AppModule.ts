import {Module} from '@nestjs/common';
import {
    CreateLoanApplicationCommandHandler
} from "@loan/LoanApplication/Application/CreateLoanApplication/CreateLoanApplicationCommandHandler";
import {CqrsModule} from "@nestjs/cqrs";
import {
    CreateLoanApplicationController
} from "@loan/LoanApplication/Infrastructure/Controller/CreateLoanApplication/CreateLoanApplicationController";
import {
    MongoLoanApplicationRepository
} from "@loan/LoanApplication/Infrastructure/Persistance/Repository/MongoLoanApplicationRepository";
import {ConfigModule} from "@nestjs/config";
import {MongoDatabaseModule} from "@shared/Infrastructure/Persistance/MongoDatabaseModule";
import {MongooseModule} from "@nestjs/mongoose";
import {
    MongoLoanApplicationModel, MongoLoanApplicationSchema
} from "@loan/LoanApplication/Infrastructure/Persistance/Model/MongoLoanApplicationModel";
import {LoanApplicationMapper} from "@loan/LoanApplication/Infrastructure/Persistance/Mapper/LoanApplicationMapper";

const Controllers = [CreateLoanApplicationController];

const Handlers = [CreateLoanApplicationCommandHandler]

const Repositories = [
    {
        provide: 'ILoanApplicationRepository',
        useClass: MongoLoanApplicationRepository,
    }
]

const Mappers = [LoanApplicationMapper]

const MongooseModelsDefinition = [
    {name: MongoLoanApplicationModel.name, schema: MongoLoanApplicationSchema}
]

@Module({
    imports: [
        CqrsModule,
        ConfigModule.forRoot({isGlobal: true}),
        MongoDatabaseModule,
        MongooseModule.forFeature([...MongooseModelsDefinition])
    ],
    controllers: [...Controllers],
    providers: [...Handlers, ...Repositories, ...Mappers],
})
export class AppModule {
}
