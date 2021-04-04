import { join } from 'path';
import { JsonFile } from './file/JsonFile';

const DATA_FILE = join(__dirname, 'user_data.json');

const Store = new JsonFile<GProfileStore>(DATA_FILE);

export type GProfileStore = {
    profiles: {
        [key: string]: {
            username: string;
            email: string;
        };
    };
};
export default Store;
