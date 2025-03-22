import {Name} from "@shared/Domain/ValueObject/Name";
import {EmailVo} from "@shared/Domain/ValueObject/EmailVo";
import {NumberVo} from "@shared/Domain/ValueObject/NumberVo";
import {Id} from "@shared/Domain/ValueObject/Id";

export class LoanApplication {
    constructor(
        private _id: Id,
        private _name: Name,
        private _email: EmailVo,
        private _amountRequested: NumberVo,
        private _termInMonths: NumberVo,
        private _monthlyIncome: NumberVo,
        private _createdAt?: Date,
        private _updatedAt?: Date
    ) {}

    public id(): Id {
        return this._id;
    }

    public name(): Name {
        return this._name;
    }

    public email(): EmailVo {
        return this._email;
    }

    public amountRequested(): NumberVo {
        return this._amountRequested;
    }

    public termInMonths(): NumberVo {
        return this._termInMonths;
    }

    public monthlyIncome(): NumberVo {
        return this._monthlyIncome;
    }

    public createdAt(): Date {
        return this._createdAt;
    }

    public updatedAt(): Date {
        return this._updatedAt;
    }
}
