

# Install dependencies
https://facebook.github.io/react-native/docs/getting-started
Be sure to follow the guide for **React Native CLI Quickstart**

After install node dependencies `npm i`

# Start the project
`npm run start`

or

`npx react-native run-android`

If you encounter any problem with the debugger running the first command, use the other.


# Other issues

If you have a problem with the start and this error appears:

```
Invalid regular expression: /(.*\\__fixtures__\\.*|node_modules[\\\]react[\\\]dist[\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$/: Unterminated character class
```

You need to change the following file:
**node_modules\metro\src\blacklist.js**

from this:
```
var sharedBlacklist = [
/node_modules[/\\]react[/\\]dist[/\\].*/,

/website\/node_modules\/.*/,

/heapCapture\/bundle\.js/,

/.*\/__tests__\/.*/];
```

to this: 

```
var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
```
