import * as sass from 'sass';
import fs from 'fs/promises';
import { minify } from "minify";
import { parse } from 'node-html-parser';
import vars from "./build_vars";

const IN = "./src";
const COMPONENTS = "./components";
const OUT = "./build";
// const BASE = "./src/base.html";

const start = Date.now();

type HtmlProcessOptions = {
    styles?: string[],
    vars?: Record<string, string>
}
const processHtml = async (html: string, options?: HtmlProcessOptions) => {
    console.log("Processing HTML file");
    const root = parse(html);

    if (options?.styles) {
        // first ensure we have a head to insert into
        const head = root.querySelector("head");
        if (head == null) {
            console.error("-! Attempted to process HTML without head tag");
            return root.toString();
        }

        for (const style of options.styles) {
            head.appendChild(parse("<link rel=\"stylesheet\" href=\"" + style + "\" />"));
            console.log("- appended link: " + "<link rel=\"stylesheet\" href=\"" + style + "\" />");
        }
    }

    let str = root.toString();
    if (options?.vars) {
        for (let i = 0; i < 2; i++) {
            for (const [key, value] of Object.entries(options.vars)) {
                // first fill in components
                if (i == 0) {
                    if (key.startsWith("c:")) {
                        console.debug("- filling component " + key);
                        str = str.replaceAll("{{ " + key + " }}", value);
                    }
                // then fill in variables (ensure that component variables are also written)
                } else {
                    if (!key.startsWith("c:")) {
                        console.debug("- setting {{ " + key + " }} to " + value);
                        str = str.replaceAll("{{ " + key + " }}", value);
                    }
                }
            }
        }
    }

    return str;
}

/**
 * Processes all .sass files in direcrory recursively, and returns a array of their paths relative to the base
 * @param dir directory to process
 * @param out output direcrory
 * @param base base directory of output (for calculating relative paths)
 */
const processStyles = async (dir: string, out: string, baseOut: string) => {
    console.log("Processing styles in " + dir);
    let styles: string[] = [];

    // ensure the output direcotry exists
    if (await fs.exists(out)) {
        // output folder already exists
        await fs.rm(out, { recursive: true, force: true });
    }
    await fs.mkdir(out, { recursive: true });
    console.log("- creating output dir: " + out);

    const input = await fs.readdir(dir, { withFileTypes: true });
    for (const file of input) {
        if (file.isDirectory()) {
            styles = styles.concat(await processStyles(dir + "/" + file.name, out + "/" + file.name, baseOut));
            continue;
        }

        const name = file.name.split(".");
        const ext = "." + name.pop();
        if (ext !== ".scss") {
            console.warn("- Non sass file will not be processed in style dir: " + file.name);
            continue;
        }

        const compiled = await sass.compile(dir + "/" + name + ext);
        let mini: string | null = null;
        try {
            mini = await minify.css(compiled.css);
        } catch (e) {
            console.warn("-! failed to minify file: " + file.name + " -> " + e);
        }
        const extOut = mini !== null ? `.min.css` : `.css`;
        console.log("- writing file: " + out + "/" + name + extOut);
        await fs.writeFile(out + "/" + name + extOut, mini !== null ? mini : compiled.css);
        styles.push(out.substring(baseOut.length) + "/" + name + extOut);
        console.debug("- dbg: " + file.name + " -> " + out.substring(baseOut.length) + "/" + name + extOut);
    }
    return styles;
}

/**
 * Processes all .html components in a directory (recursively). These components can be reused in any site html document
 * using {{ c:name }} (no .html)
 * @param dir directory to process
 * @returns map of components and inner html
 */
const processComponents = async (dir: string) => {
    console.log("Building components from " + dir);
    let components: Map<string, string> = new Map();

    const input = await fs.readdir(dir, { withFileTypes: true });
    for (const file of input) {
        if (file.isDirectory()) {
            components = { ...components, ...await processComponents(dir + "/" + file.name) };
            continue;
        }
        const name = file.name.split(".");
        const ext = "." + name.pop();
        if (ext !== ".html") {
            console.warn("- Non html file will not be processed in component dir: " + file.name);
            continue;
        }

        const html = await fs.readFile(dir + "/" + file.name, "utf-8");
        // placeholder tags are not filled at the moment, we need to do that later
        components.set(name.join("."), html);
        // components[name.join(".")] = html;
        console.log("- registered component: " + file.name);
    }
    return components;
}

const build = async (dir: string, out: string, vars: Record<string, string>,inheritedStyles?: string[]) => {
    console.log("Building from " + dir);
   
    if (await fs.exists(out)) {
        // output folder already exists
        await fs.rm(out, { recursive: true, force: true });
    }
    try {
        await fs.mkdir(out, { recursive: true });
    } catch (e) {
        await (new Promise(r => setTimeout(r, 100))); // wait 100ms
        await fs.mkdir(out, { recursive: true });
    }

    // a string array of relative paths to compiled stylesheets
    // these should be placed in all html documents
    // styles can be inherited from above build directories
    let styles: string[] = [];
    styles = styles.concat(inheritedStyles ?? []);

    // check if there's a style direcrory for us to process
    if (await fs.exists(dir + "/style")) {
        styles = styles.concat(await processStyles(dir + "/style", out + "/style", OUT));
    }

    const input = await fs.readdir(dir, { withFileTypes: true });
    for (const file of input) {
        if (file.isDirectory()) {
            if (file.name === "style") {
                // this directory is processed above, we don't need to do it again
                continue;
            }
            await build(dir + "/" + file.name, out + "/" + file.name, vars, styles);
        } else {
            const name = file.name.split(".");
            const ext = "."+name.pop();
            switch (ext) {
                case ".scss":
                    console.warn("Sass files should be placed under a style directory, buliding anyway: " + file.name);
                    const compiled = await sass.compile(dir + "/" + name + ext);
                    // const mini = await minify.css(compiled.css);
                    await fs.writeFile(out + "/" + name+".min.css", compiled.css);
                    break;
                case ".html":
                    const processed = await processHtml(await fs.readFile(dir + "/" + name + ext, "utf-8"),
                        {
                            styles: styles,
                            vars
                        });
                    await fs.writeFile(out + "/" + name + ext, processed);
                    break;
                default:
                    await fs.copyFile(dir + "/" + name + ext, out + "/" + name + ext);
                    break;
            }
        }
    }
}

const initBuild = async () => {
    let variables = vars();
    (await processComponents(COMPONENTS)).forEach((value, key) => {
        variables["c:" + key] = value;
    });
    await build(IN, OUT, variables);
    console.log("Built in " + (Date.now() - start) + "ms");
};

await initBuild();

if (process.argv[2] === "serve" || process.argv[2] === "watch") {
    // require("node-http-server").deploy({ port: 8080, root: OUT });
    const http = require("http");
    const handler = require("serve-handler");
    http.createServer((res: any, req: any) => handler(res, req, { public: OUT })).listen(8080);
    console.log("Serving on http://localhost:8080");
    if (process.argv[2] === "watch") {
        console.log("Watching for changes...");
        (async () => {
            const watcher = fs.watch(IN, { recursive: true });
            for await (const event of watcher) {
                const start = Date.now();
                console.log(event);
                try {
                    await initBuild();
                    console.log("Built in " + (Date.now() - start) + "ms");
                } catch(e) {
                    console.error("Build failed: " + e);
                }
            }
        })();
    }
}