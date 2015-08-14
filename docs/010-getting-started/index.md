Title: Getting started
—
Text:

If you choose to use the CloudAPI command line interface (CLI), be aware that it
requires Node.js and npm.

You can get Node.js from [nodejs.org](http://nodejs.org) as source code, and as
precompiled packages for Windows and Macintosh.  It should be greater or equal
than v0.8.14, so npm should come with it as well.

Once you've installed Node.js and npm, install the CloudAPI CLI as follows:

    $ npm install smartdc -g

You will also want to install [json](https://www.npmjs.org/package/json), a tool
that makes it easier to work with JSON-formatted output.  You can install it
like this:

    $ npm install json -g

In both cases the `-g` switch installs the tools globally, usually in
`/usr/local/bin`, so that you can use them easily from the command line.  You
can omit this switch if you'd rather the tools be installed in your home
hierachy, but you'll need to set your PATH appropriately.

