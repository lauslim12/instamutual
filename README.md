# Instamutual

Node.js command-line tool to find out people who do not follow you back on Instagram. This repository does not use any third-party libraries and will just purely use your own downloaded data (per your own request) as they are.

## Introduction

Instagram does not really provide a way for you to check if someone does not follow you back by itself. You have to do that manually. This tool helps you to do that, so you can identify who has unfollowed you and how you should act or retaliate against that action.

## Requirements

- [Node.js LTS](https://nodejs.org/)
- [Yarn 1.22+](https://yarnpkg.com/)

You can also use `npm` if you want to. Replace all `yarn` occurences with `npm`.

## Usage

- First and foremost, please clone this repository on your local computer.

```bash
git clone git@github.com:lauslim12/instamutual.git
```

- Install all required dependencies.

```bash
# If you're using yarn
yarn

# If you're using npm
npm install
```

- The next step is on you. You have to download your data on Instagram. Steps to do this on the mobile application are:

  1. Click your profile.
  2. Click the hamburger menu on the top right.
  3. Click `Your activity`.
  4. Scroll down to the bottom, and click on `Download your information`.
  5. Click `Request a download`.
  6. Click `Select types of information`.
  7. Select `Followers and following` and then click `Next`.
  8. In the `Format` section, change it to `JSON` and change the `Date range` to `All time`.
  9. Optionally, you can set `Media quality` to `High` (it doesn't really matter).
  10. Click `Submit request` and wait for Instagram to reply to your request. They should get back to you via email.
  11. Download your data from the link that Instagram gave you. You should get a `.zip` file and you have to unzip it.

- After getting your data from Instagram, you have to move the data to this repository:

  1. Open the downloaded file.
  2. You will get a folder titled `followers_and_following`, and there should be a file named `followers_1.json` and `following.json`. The name may be different, but it should be pretty straightforward to get your data from there.
  3. Move both files to `input` folder in your cloned repository.

- If the filename is different, you have to adjust it in the codebase (`src/index.ts`), the variables are named `FOLLOWERS_FILE_PATH` and `FOLLOWING_FILE_PATH`. In the future, this should be set via an environment variable with sensible defaults.

- After your setup is done, you can run the script by using the following command:

```bash
yarn start
```

- Done! The output will be placed in the `out/output.json`. Ideally, this should also be able to be set via environment variables.

## Contributing

If you want to contribute, please create an issue or a pull request. Do not forget to run `yarn lint` in order to keep the code in unified standards. All ESLint and Prettier configurations are embedded inside `package.json` for practicality. We are using ESLint's TypeScript Recommended style with Prettier.

## License

Project is licensed under MIT License.
