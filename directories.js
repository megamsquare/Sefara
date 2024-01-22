const fileSystem = {};

function createDirectory(path) {
  const pathParts = path.split("/");
  let currentDir = fileSystem;

  for (const part of pathParts) {
    if (!currentDir[part]) {
      currentDir[part] = {};
    }
    currentDir = currentDir[part];
  }

  return `CREATE ${path}`;
}

function moveDirectory(source, destination) {
  const sourceParts = source.split("/");
  const destinationParts = destination.split("/");
  let currentDir = fileSystem;
  let temp;

  for (const path of sourceParts) {
    if (currentDir[path]) {
      temp = currentDir[path];
    } else if (temp && temp[path]) {
      continue;
    } else {
      return `Cannot move ${source} - ${source} does not exist`;
    }
  }

  const movedDir =
    sourceParts.length === 1 ? { [sourceParts[0]]: temp } : { ...temp };

  let destinationDir = fileSystem;

  for (let i = 0; i < destinationParts.length - 1; i++) {
    const part = destinationParts[i];
    if (!destinationDir[part]) {
      return `Cannot move ${source} - ${destination} does not exist`;
    }
    destinationDir = destinationDir[part];
  }

  const destinationKey = destinationParts[destinationParts.length - 1];

  // If the destination already exists, merge the contents
  if (destinationDir[destinationKey]) {
    Object.assign(destinationDir[destinationKey], movedDir);
  } else {
    destinationDir[destinationKey] = movedDir;
  }

  deleteDirectory(source);

  return `MOVE ${source} ${destination}`;
}

function deleteDirectory(path) {
  const pathParts = path.split("/");
  let currentDir = fileSystem;

  for (const part of pathParts.slice(0, -1)) {
    if (!currentDir[part]) {
      return `Cannot delete ${path} - ${part} does not exist`;
    }
    currentDir = currentDir[part];
  }

  const lastPart = pathParts[pathParts.length - 1];

  if (currentDir[lastPart]) {
    delete currentDir[lastPart];
    return `DELETE ${path}`;
  } else {
    return `Cannot delete ${path} - ${lastPart} does not exist`;
  }
}

function listDirectories() {
  const result = [];

  const traverse = (currentPath, indentation) => {
    for (const [directory, content] of Object.entries(currentPath)) {
      result.push(`${indentation}${directory}`);
      traverse(content, `${indentation}  `);
    }
  };

  traverse(fileSystem, "");
  return result.join("\n");
}

function main() {
  // Sample input
  const inputCommands = [
    "CREATE fruits",
    "CREATE vegetables",
    "CREATE grains",
    "CREATE fruits/apples",
    "CREATE fruits/apples/fuji",
    "LIST",
    "CREATE grains/squash",
    "MOVE grains/squash vegetables",
    "CREATE foods",
    "MOVE grains foods",
    "MOVE fruits foods",
    "MOVE vegetables foods",
    "LIST",
    "DELETE fruits/apples",
    "DELETE foods/fruits/apples",
    "LIST",
  ];

  // Execute commands
  for (const command of inputCommands) {
    const [action, ...args] = command.split(" ");
    switch (action) {
      case "CREATE":
        console.log(createDirectory(args.join(" ")));
        break;
      case "MOVE":
        console.log(
          moveDirectory(args.slice(0, -1).join(" "), args.slice(-1).join(" "))
        );
        break;
      case "DELETE":
        console.log(deleteDirectory(args.join(" ")));
        break;
      case "LIST":
        console.log("LIST \n", listDirectories());
        break;
      default:
        console.log("Invalid command");
    }
  }
}

main();
