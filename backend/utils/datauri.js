import DataUriParser from "datauri/parser.js"
import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();
    if (!file) {
        throw new Error('File is not provided');
    }
    const extName = path.extname(`${Date.now()}-${file.originalname}`).toString();
    return parser.format(extName, file.buffer);
}
export default getDataUri;

