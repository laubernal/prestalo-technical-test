import {NumberFormatError} from "@shared/Domain/Error/NumberFormatError";

export class NumberVo {
    constructor(private readonly _value: number) {
        this.validate();
    }

    protected validate(): boolean {
        try {
            if (typeof this._value === 'number') {
                return true;
            }

            throw new NumberFormatError();
        } catch (error: any) {
            throw new NumberFormatError();
        }
    }

    get value(): number {
        return this._value;
    }
}