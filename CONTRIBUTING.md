# Contributing Guidelines

Pull requests, bug reports, and all other forms of contribution are welcomed and
highly encouraged!

## Contents

- [Contributing Guidelines](#contributing-guidelines)
  - [Contents](#contents)
  - [📝 Writing commit messages](#-writing-commit-messages)
  - [💅 Contribution style](#-contribution-style)
  - [🔁 Submitting pull requests](#-submitting-pull-requests)
  - [🙏 Credits](#-credits)

## 📝 Writing commit messages

Please [write a great commit message](https://cbea.ms/git-commit/) and try
following the [conventional commits](https://www.conventionalcommits.org) model.

1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Use the imperative mood in the subject line (example: "fix: networking
   issue")
4. Wrap the body at about 72 characters
5. Use the body to explain why, not what and how (the code shows that!)
6. If applicable, prefix the title with the relevant component name. (examples:
   `doc(frontend): fix typo`, `feat(core): add jpeg support`)

## 💅 Contribution style

- Use project software and wait approval from maintainers is you propose new
  [FOSS](https://en.wikipedia.org/wiki/Free_and_open-source_software).
- Prefers [plain text](https://wiki.c2.com/?PowerOfPlainText) format over
  software dependent ones (eg: `odt` -> `markdown`).
- Prefers simpler standards (especially web standards) to avoid reducing
  portability and prevent toolchain complexity.
- Avoid platform specific tool to allow any os user to contributes.
- For any applicable code (typescript, markdown, json, ...) use
  [deno style guide](https://docs.deno.com/runtime/manual/references/contributing/style_guide).
- Use in code doc if applicable, especially for public exposed parts.
- Run fmt/test/check tools locally before pushes (install git hooks if
  available).
- Use tabs instead of spaces for accessibility.
- Do not use copyrighted content expect if there is no alternatives.

## 🔁 Submitting pull requests

We **love** pull requests! Before
[forking the repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
and
[creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/proposing-changes-to-your-work-with-pull-requests)
for non-trivial changes, it is usually best to first open an issue to discuss
the changes, or discuss your intended approach for solving the problem in the
comments for an existing issue.

For most contributions, after your first pull request is accepted and merged,
you will be
[invited to the project](https://help.github.com/en/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository)
and given **push access**. 🎉

_Note: All contributions will be licensed under the project's license._

- **Smaller is better.** Submit **one** pull request per bug fix or feature. A
  pull request should contain isolated changes pertaining to a single bug fix or
  feature implementation. **Do not** refactor or reformat code that is unrelated
  to your change. It is better to **submit many small pull requests** rather
  than a single large one. Enormous pull requests will take enormous amounts of
  time to review, or may be rejected altogether.

- **Coordinate bigger changes.** For large and non-trivial changes, open an
  issue to discuss a strategy with the maintainers. Otherwise, you risk doing a
  lot of work for nothing!

- **Prioritize understanding over cleverness.** Write code clearly and
  concisely. Remember that source code usually gets written once and read often.
  Ensure the code is clear to the reader. The purpose and logic should be
  obvious to a reasonably skilled developer, otherwise you should add a comment
  that explains it.

- **Follow existing coding style and conventions.** Keep your code consistent
  with the style, formatting, and conventions in the rest of the code base. When
  possible, these will be enforced with a linter. Consistency makes it easier to
  review and modify in the future.

- **Include test coverage.** Add unit tests or UI tests when possible. Follow
  existing patterns for implementing tests.

- **Update the example project** if one exists to exercise any new functionality
  you have added.

- **Add documentation.** Document your changes with code doc comments or in
  existing guides.

- **Reference related issues if it exist** example:
  `- Fixed crash in profile view. #123 @jessesquires`.

- **Use the repo's default branch.** Branch from and
  [submit your pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork)
  to the repo's default branch. Usually this is `main`, but it could be `dev`,
  `develop`, or `master`.

- **[Resolve any merge conflicts](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/resolving-a-merge-conflict-on-github)**
  that occur.

- **Promptly address any CI failures**. If your pull request fails to build or
  pass tests, please push another commit to fix it.

- When writing comments, use properly constructed sentences, including
  punctuation.

## 🙏 Credits

Inspired by
[@jessesquires](https://github.com/jessesquires/.github/blob/main/CONTRIBUTING.md)
