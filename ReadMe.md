#
Title: Common Method of Organizing Files On a Computer

To initialize this project, run

```bash
node directories.js
```

This project is a simplified file system implementation in JavaScript using an in-memory data structure. The `fileSystem` object acts as the root directory, and various functions (`createDirectory`, `moveDirectory`, `deleteDirectory`, and `listDirectories`) simulate basic file system operations.

- **createDirectory(path):** Creates directories in the file system based on the given path.

- **moveDirectory(source, destination):** Moves directories from a source path to a destination path within the file system.

- **deleteDirectory(path):** Deletes directories specified by the given path.

- **listDirectories():** Lists the directories and their structure in the file system.

The `main()` function executes a sequence of predefined commands (`inputCommands` array) to showcase the functionality of the file system. Commands include creating, moving, deleting directories, and listing the current directory structure.

The `fileSystem` object is manipulated accordingly, and the results of each operation are logged to the console. The primary purpose of this project is to illustrate a basic file system model and demonstrate how these file system operations interact.