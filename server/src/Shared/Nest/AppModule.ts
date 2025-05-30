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
import {
    GetLoanApplicationsController
} from "@loan/LoanApplication/Infrastructure/Controller/GetLoanApplications/GetLoanApplicationsController";
import {
    GetLoanApplicationsQueryHandler
} from "@loan/LoanApplication/Application/GetLoanApplications/GetLoanApplicationsQueryHandler";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path';
import {RabbitMqModule} from "@shared/Infrastructure/Persistance/RabbitMQModule";

const Controllers = [
    CreateLoanApplicationController,
    GetLoanApplicationsController
];

const Handlers = [
    CreateLoanApplicationCommandHandler,
    GetLoanApplicationsQueryHandler
]

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
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../../', 'client/out'),
            exclude: ['/api/(.*)'],
        }),
        MongoDatabaseModule,
        MongooseModule.forFeature([...MongooseModelsDefinition]),
        RabbitMqModule
    ],
    controllers: [...Controllers],
    providers: [...Handlers, ...Repositories, ...Mappers],
})
export class AppModule {
}
