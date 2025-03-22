import {StringFormatError} from "@shared/Domain/Error/StringFormatError";

export class StringVo {
    constructor(private _value: string) {
        this.validate();
    }

    protected validate(): boolean {
        try {
            if (typeof this._value === 'string') {
                this._value = this._value.trim();
                return true;
            }

            if (typeof this._value === 'undefined') {
                return true;
            }

            throw new StringFormatError();
        } catch (error: any) {
            throw new StringFormatError();
        }
    }

    get value(): string {
        return this._value;
    }
}
