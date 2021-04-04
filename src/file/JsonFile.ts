import { File } from './File';
import _ from 'lodash';
import { passThroughOptions } from 'commander';

export type JsonObject = { [key: string]: any };

export class JsonFile<J extends JsonObject> extends File<JsonObject> {
    public get(): J {
        return super.get() as J;
    }

    /**
     * Merges the provided data:JsonObject into this JsonFile.
     * JSON objects in the original file will not get deleted.
     *
     * @param data - A generic JsonObject to merge.
     */
    public merge(data: JsonObject) {
        super.write(_.merge(this.data, data));
    }

    public getVal<U>(ref: string) {
        const parts = ref.split('.');
        let curr = { ...this.data };

        for (let i = 0; i < parts.length; i++) {
            let key = parts[i];
            if (curr.hasOwnProperty(key)) {
                curr = curr[key];
            } else {
                return undefined;
            }
        }
        return curr as U;
    }

    public removeVal(ref: string) {
        const parts = ref.split('.');
        let curr = this.data;

        for(let i = 0; i < parts.length - 1; i++) {
            let key = parts[i];
            if(curr.hasOwnProperty(key)) {
                curr = curr[key];
            } else {
                throw new Error("Invalid object property reference given!");
            }
        }

        const target_key = parts[parts.length - 1];
        delete curr[target_key]
        this.write(this.data);
    }

    public toRaw(data: JsonObject): string {
        return JSON.stringify(data);
    }
    public toData(rawData: Buffer): JsonObject {
        return JSON.parse(rawData.toString());
    }
    public defaultValue(): JsonObject {
        return {};
    }
}
