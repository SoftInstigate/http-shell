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
| set auth <id> <password> | sets the basic authentication credentials to use in further requests | > set auth admin secret |
| get auth | prints the basic authentication credentials | > get auth |
| set url <url> | sets the base url to use in further requests | > set url http://127.0.0.1:8080 |
| get url | prints the base url | > get url |
| get <uri> | executes the GET request to url=<base-url>+<uri> | > get /collection |
| edit <file> | opens <file> for editing | > edit body.json |
| post <uri> <file> | executes the request POST <base-url>+<uri>, sending the content of <file> as the request body | > post /collection body.json |
| put <uri> <file> | executes the request PUT <base-url>+<uri>, sending the content of <file> as the request body | > put /collection body.json |
| patch <uri> <file> | executes the request PATCH <base-url>+<uri>, sending the content of <file> as the request body | > patch /collection body.json |
| delete <uri> | executes the DELETE request to url=<base-url>+<uri> | > delete /collection |
| set header <name> <value> | set the header <name> to <value> | > set header If-Match 5f7f35efcb800f2502f95cb5 |
| get headers | prints the current set headers | > get headers |
| clear headers | clears the headers | > clear headers |

`,
        contentType: "text/markdown"
      }
    ]
  };

export default async (registrar: Registrar) => {
  registrar.listen("/help/restheart", () => usage);
};
