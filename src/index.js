const fs = require("fs");
const readline = require("readline");
const path = require("path");

const directory = "./src/content";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function slugify(input) {
  const cleanedString = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
  const slug = cleanedString.replace(/^-+|-+$/g, "");
  return slug;
}

function extractMarkdownTable(content) {
  const tableStart = content.indexOf("---");
  if (tableStart === -1) {
    return null; // No Markdown table found in the content
  }

  const tableEnd = content.indexOf("---", tableStart + 3);
  if (tableEnd === -1) {
    return null; // Markdown table closure not found
  }

  const markdownTable = content.slice(tableStart, tableEnd + 3);
  return markdownTable;
}

function extractNamesFromMarkdownTable(markdownTable, fileName) {
  const lines = markdownTable.split("\n");
  const names = lines
    .filter((line) => line.trim() !== "---" && line.trim() !== "") // Remove empty lines and delimiters
    .map((line) => {
      const parts = line.trim().split(":");
      return parts[0].trim(); // Keep only row names
    });

  const arrayWithCustomizations = names.map((item) => {
    if (item === "title") {
      return `${item}: "${fileName}"`;
    } else if (item === "pubDate") {
      return `${item}: "${new Date().toISOString()}"`;
    } else {
      return item + ":";
    }
  });

  return arrayWithCustomizations.join("\n"); // Convert names into a single block of text
}

function generateMarkdownFile() {
  fs.readdir(directory, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error("Error reading the directory:", err);
      rl.close();
      return;
    }

    const folders = files
      .filter((file) => file.isDirectory())
      .map((file) => file.name);

    if (folders.length === 0) {
      console.log("No folders found in the directory.");
      rl.close();
      return;
    }

    console.log("Available folders:");
    console.log(`----------------------------------`);
    folders.forEach((folder, index) => {
      console.log(`${index + 1}. ${folder}`);
    });
    console.log(`---------------------------------- \n`);

    rl.question("Select a folder (number): ", (response) => {
      const option = parseInt(response);
      if (option >= 1 && option <= folders.length) {
        const chosenFolder = folders[option - 1];
        console.log(`You've chosen the folder: ${chosenFolder} \n`);

        const mdFiles = fs
          .readdirSync(path.join(directory, chosenFolder))
          .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

        if (mdFiles.length > 0) {
          // Read the content of the first .md or .mdx file
          const firstFile = mdFiles[0];
          const filePath = path.join(directory, chosenFolder, firstFile);
          const content = fs.readFileSync(filePath, "utf-8");

          // Extract the Markdown table
          const markdownTable = extractMarkdownTable(content);

          if (markdownTable) {
            rl.question(
              "Enter a name for the new file (without extension): ",
              (name) => {
                const fileSlug = slugify(name);

                const names = extractNamesFromMarkdownTable(
                  markdownTable,
                  name
                );

                const newContent = `---\n${names}\n---\n`; // New content with modified Markdown table

                const newFilePath = path.join(
                  directory,
                  chosenFolder,
                  `${fileSlug}.md`
                );
                fs.writeFileSync(newFilePath, newContent, "utf-8");

                console.log(
                  `The file '${fileSlug}.md' has been created and saved in the folder ${directory}/${chosenFolder}/.`
                );
                rl.close();
              }
            );
          } else {
            console.log("Markdown format compatible with Astro not found.");
            rl.close();
          }
        } else {
          console.log("No .md or .mdx files found in the folder.");
          rl.close();
        }
      } else {
        console.log("Invalid selection. Please try again.");
        rl.close();
      }
    });
  });
}

module.exports = {
  generateMarkdownFile,
};
