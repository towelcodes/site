import { execSync } from "child_process";
export default (): Record<string, string> => {
    return {
        "BASE_GITHUB": "towelcodes/site",
        "BUILD_TIME": Date.now().toString(),
        "COMMIT_HASH": execSync("git rev-parse --short HEAD").toString().trim(),
        "COMMIT_HASH_FULL": execSync("git rev-parse HEAD").toString().trim(),
    };
}