# Instamutual

Node.js command-line tool to find out people who do not follow you back on Instagram.

## Introduction

Instagram does not really provide a way for you to check if someone does not follow you back by itself. You have to do that manually. This tool helps you to do that, so you can identify who has unfollowed you and how you should act against that action.

This tool does **NOT** permit you to spam. Do not use this tool in short bursts or you will risk your account being temporary blocked. I take no responsibility for that. Use this tool with your own responsibility and at your own risk.

## Requirements

- [Node.js 14+](https://nodejs.org/)
- [Yarn 1.22+](https://yarnpkg.com/)

You can also use `npm` if you want to. Replace all `yarn` occurences with `npm`.

## Usage

- First and foremost, **change your Instagram password and disable Two-Factor Authentication while you are using this application**. Change it back to your usual one or a stronger/different one after your usage of this tool.

- After you have done so, please clone this repository.

```bash
git clone git@github.com:lauslim12/instamutual.git
```

- Install all dependencies required.

```bash
# Yarn version
yarn

# NPM version
npm i
```

- Export environment variables for your usage. Be mindful of your environment and operating system!

```bash
# UNIX
export IG_USERNAME=YOUR_IG_USERNAME
export IG_PASSWORD=YOUR_IG_PASSWORD

# Windows
set IG_USERNAME=YOUR_IG_USERNAME
set IG_PASSWORD=YOUR_IG_PASSWORD
```

- Run the project.

```bash
# Yarn version
yarn start

# NPM version
npm start
```

- You will see the results exported in `out.json` in the `out` folder. Check it out there.

- Finally, **change back your Instagram password and re-enable your Two Factor Authentication after you have finished using this application. Do NOT leave the password as it is**.

## Contributing

If you want to contribute, please create an issue or a pull request. Do not forget to run `yarn lint` in order to keep the code in unified standards. All ESLint and Prettier configurations are embedded inside `package.json` for practicality. We are using ESLint's TypeScript Recommended style with Prettier.

## License

Project is licensed under MIT License.
