# astro-md-generator

This command-line interface (CLI) is designed for adding new posts to your Astro project. It analyzes the content in your `src/content/` folder to detect the structure of your Markdown/MDX files and enables you to generate new files that match your project's structure."

<p align="center">
  <img align="center" alt="astro-md-generator" src="https://s3.amazonaws.com/gndx.dev/screenshot.gif"/>
</p>

## Install

```npm
npm install -g astro-md-generator
```

## 📝 Adding New Posts (Usage)

To add a new post, run the following command in your project folder:

```bash
astro-md-generator
```

Follow the instructions and this will generate a new markdown file in the `src/content/<FOLDER>`. Edit the file to add your post content.

## 🛠️ Add a command to your project

In your project built with Astro, add a new script in `package.json`

```scheme
"scripts": {
  ...
    "newpost": "astro-md-generator",
  },
```

## 💻 Contributing

Contributions to this project are welcome. If you find a bug or have a suggestion for improvement, please open an issue or submit a pull request.

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## 📃 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## ☕ Support

If this project helped you learn something new, or if you're feeling particularly generous, you can buy me a coffee. It's greatly appreciated! 😊 [GitHub Sponsors](https://github.com/sponsors/gndx)