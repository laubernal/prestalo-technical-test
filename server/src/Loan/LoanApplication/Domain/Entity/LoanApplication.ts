export class LoanApplication {
    constructor(
       private _id: string,
       private _name: string,
       private _email: string,
       private _amountRequested: number,
       private _termInMonths: number,
       private _monthlyIncome: number,
       private _createdAt?: Date,
       private _updatedAt?: Date) {}

    public id(): string {
        return this._id;
    }

    public name(): string {
        return this._name;
    }

    public email(): string {
        return this._email;
    }

    public amountRequested(): number {
        return this._amountRequested;
    }

    public termInMonths(): number {
        return this._termInMonths;
    }

    public monthlyIncome(): number {
        return this._monthlyIncome;
    }

    public createdAt(): Date {
        return this._createdAt;
    }

    public updatedAt(): Date {
        return this._updatedAt;
    }
}
