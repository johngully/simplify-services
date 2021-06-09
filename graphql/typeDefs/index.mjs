import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";

const globPattern = path.join(process.cwd(), "./graphql/typeDefs/**/*.graphql");
const typeDefs = loadFilesSync(globPattern);
const mergedTypeDefs = mergeTypeDefs(typeDefs);

export default mergedTypeDefs;
