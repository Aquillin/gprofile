import { basename } from 'path';
import fs from 'fs-extra';

export abstract class File<T> {
    protected path: string;
    protected filename: string;
    protected data: T;

    constructor(path: string) {
        this.path = path;
        this.filename = basename(path);
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, this.defaultRawValue());
            this.data = this.defaultValue();
        } else {
            this.data = this.read();
        }
    }

    private read(): T {
        return this.toData(fs.readFileSync(this.path));
    }

    public get(): T {
        return this.data;
    }

    public write(data: T) {
        try {
            fs.writeFileSync(this.path, this.toRaw(data));
            this.data = data;
        } catch (err) {
            fs.writeFileSync(this.path, this.toRaw(this.data));
        }
    }

    public abstract toRaw(data: T): string;
    public abstract toData(rawData: Buffer): T;
    public abstract defaultValue(): T;
    public defaultRawValue() {
        return this.toRaw(this.defaultValue());
    }
}
