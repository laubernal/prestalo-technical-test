import {ILoanApplicationRepository} from "@loan/LoanApplication/Domain/Repository/ILoanApplicationRepository";
import {Injectable} from "@nestjs/common";
import {LoanApplication} from "@loan/LoanApplication/Domain/Entity/LoanApplication";
import {InjectModel} from "@nestjs/mongoose";
import {
    MongoLoanApplicationModel
} from "@loan/LoanApplication/Infrastructure/Persistance/Model/MongoLoanApplicationModel";
import {Model} from "mongoose";
import {LoanApplicationMapper} from "@loan/LoanApplication/Infrastructure/Persistance/Mapper/LoanApplicationMapper";

@Injectable()
export class MongoLoanApplicationRepository implements ILoanApplicationRepository {
    constructor(
        private readonly mapper: LoanApplicationMapper,
        @InjectModel(MongoLoanApplicationModel.name)
        private readonly mongoLoanApplicationModel: Model<MongoLoanApplicationModel>
    ) {
    }

    public async save(entity: LoanApplication): Promise<void> {
        try {
            const loanApplication = this.mapper.toModel(entity);

            await this.mongoLoanApplicationModel.create(loanApplication);
        } catch (error: any) {
            throw new Error(`Mongoose Loan Application Repository Error - ${error}`);
        }
    }
}