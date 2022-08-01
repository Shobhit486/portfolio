# Shobhit Gupta

## Change about and links

- Open `db.json` file in the root directory of the project.
- Make needed changes
- Icons should be taken from [Remix icons](https://remixicon.com)

## Change theme color

- Open `src/styles/theme.css` file
- Change color value for `--color-accent`
  - Changing color at `--color-accent-light` will change it for light mode.
  - Changing color at `--color-accent-dark` will change it for dark mode.
- Change other color values as per your need.

## Add projects

- Create a file in `projects` directory with extension `.md`.
- Update meta-data in the file like:
  - `id`: Should be same as the file name (without .md).
  - `name`: Name of the project, visible on homepage.
  - `image`: Link of the image, visible on homepage and in hero section (mobile) of project detail page.
  - `hero`: Link of the hero image, visible in hero section (desktop) of project detail page (optional).
  - `description`: Description of the project, visible on homepage.
  - `tags`: List of tags which can be used to filter the projects
- Add the content/details of the project below the meta-data (---).
  - Use the [markdown syntax](https://www.markdownguide.org/cheat-sheet/) to add content.
  - Images can be added with same format.

## Add images and other files

- Upload files in `public` directory.
- If a file is uploaded: like `public/images/profile.png`, then it can be used as `/images/profile.png` in the project detail page.
