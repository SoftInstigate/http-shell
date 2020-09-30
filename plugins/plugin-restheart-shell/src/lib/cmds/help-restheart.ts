import { Registrar, MultiModalResponse } from "@kui-shell/core";
// import Debug from "debug";

// const debug = Debug("plugins/restheart-shell/test");

const usage: MultiModalResponse = {
    metadata: { name: "RESTHeart Shell Help" },
    kind: "Top",
    modes: [
      {
        mode: "Available commands",
        content: `
| command | description | example
|---|---|---|
| set auth <id> <password> | sets the basic authentication credentials | \`> set auth admin secret\` |
| get auth | prints the basic authentication credentials | \`> get auth\` |
| set url | sets the base url | \`> set url http://127.0.0.1:8080\` |
| get url | prints the base url | \`> get url\` |
| get | executes the GET request to url=<base-url>+<uri> | \`> get /collection\` |
        `,
        contentType: "text/markdown"
      }
    ]
  };

export default async (registrar: Registrar) => {
  registrar.listen("/help/restheart", () => usage);
};
