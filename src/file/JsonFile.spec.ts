import fs from 'fs-extra';
import _ from 'lodash';
import { join } from 'path';
import { JsonFile } from './JsonFile';

describe('JsonFile', () => {
    const DEFAULT_DATA = {
        data1: {
            str: 'STRING',
            num: 111513,
            bool: true,
        },
        message: 'Hello world!',
    };
    const TEST_DATA = { hey: 'WORLD' };
    const FILEPATH = join(__dirname, './JsonFile.spec.json');
    let file: JsonFile<typeof DEFAULT_DATA>;

    beforeAll(() => {
        fs.writeFileSync(FILEPATH, JSON.stringify(DEFAULT_DATA));
    });

    beforeEach(() => {
        file = new JsonFile(FILEPATH);
    });

    it('Gets the data from a file successfully.', () => {
        expect(file.get()).toEqual(DEFAULT_DATA);
    });

    it("Merges two objects together and overrides a files data + cache", () => {
        file.merge(TEST_DATA);
        const merged_object = _.merge(DEFAULT_DATA, TEST_DATA);
        expect(file.get()).toEqual(merged_object);
        expect(JSON.parse(fs.readFileSync(FILEPATH).toString())).toEqual(merged_object)
    })

    it('Writes data to the file successfully', () => {
        file.write(TEST_DATA);
        expect(JSON.parse(fs.readFileSync(FILEPATH).toString())).toEqual(
            TEST_DATA
        );
    });

    it('Updates the cached data after writing to a file.', () => {
        file.write(TEST_DATA);
        expect(file.get()).toEqual(TEST_DATA);
    });

    it("Converts data to raw and then back", () => {
        expect(file.toData(new Buffer(file.toRaw(TEST_DATA)))).toEqual(TEST_DATA)
    })

    it('Has the default val of an empty object', () => {
        expect(file.defaultValue()).toEqual({});
    });

    it('Has the default raw value of an empty object', () => {
        expect(file.defaultRawValue()).toBe('{}');
    });

    it("Deletes data from the object given a reference", () => {
        file.merge(TEST_DATA)
        file.removeVal('hey')
        expect(file.getVal('hey')).toEqual(undefined);
    })

    it("Updates the main JSON file after deleting a reference on an object", () => {
        expect(JSON.parse(fs.readFileSync(FILEPATH).toString())).toEqual({});
    })
});
