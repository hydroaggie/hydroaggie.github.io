# Computational and Integrated Hydrology Group

![Group Logo](assets/img/logos/group-logo.png)

Official group website repository for the SCI-Hy group at Utah State University.

This is built from Jekyll using the [al-folio](https://github.com/alshedivat/al-folio) template. For more information on how to use the template to build a website, see my [blog post](https://hydroaggie.github.io/blog/2023/Create-Your-Personal-Website-Using-Github-Pages/).

## How to build a website for an academic group?
The [al-folio](https://github.com/alshedivat/al-folio) template allows you to build a personal website easily. However, the current template does not include elements (e.g., a team page) for a group website. Fortunately, it is relatively straightforward to add another page in the template, and I found the [diagnostics group](https://inbt.jhu.edu/epidiagnostics/) and [Programming Group](https://programming-group.com/) beautifully demonstrated this with a dedicated Team page. I was only able to find the [source code](https://github.com/hunky-d0ry/hunky-d0ry.github.io) for the [diagnostics group](https://inbt.jhu.edu/epidiagnostics/), which is on GitHub. So I incorporated the changes made in that GitHub repo into my group website.

Here I will demonstrate the steps I took to add a Team page. 
- Create `_members` folder under root directory. Inside the `_members`, create a markdown file for each member of your group ([example](https://github.com/hydroaggie/hydroaggie.github.io/tree/master/_members)). Note that the members are organized into different groups (e.g., faculty, graduate students, post-doc, etc.) and are ordered based on the keyword `group_rank` in the header. 
- Create a `team.md` file inside `_pages` folder. This is the file that lists all members of the group. The only thing you will want to change is the path to the profile pictures (default: `/assets/img/team/`). You need to create such path under `assets` and put related profile pics. 
- Add team css class in `_sass/_base.scss`. Add the following class to the file (can be placed anywhere).

```bash
// Team

.team {
  .card-body {
    a:first-of-type {
      text-decoration: none;
    }
   padding: 13.5px;
  }
}
```

- Add collections in `_config.yml`. Put the `members` following under `collections:`. **This is important for members to show up on Team page.**

```bash
collections:
  news:
    defaults:
      layout: post
    output: true
    permalink: /news/:path/
  projects:
    output: true
    permalink: /projects/:path/
  members:
    output: true
    permalink: /members/:path
```

- Rebuild the website. Voila! Your new group website is up and running.

## How to add your own profile?
This applies to new group members who would like to add their own profile to the Members page. Before you start, you may want to review common git commands (I have a quick tutorial [here](https://hydroaggie.github.io/assets/pdf/Intro_to_Git.pdf)) and a documentation on [Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

1. First, make sure you have created a GitHub account. This is necessary for copying and making changes to current repository on GitHub.
2. Fork current repository. It will create a copy under your own account.
3. Go to the forked copy (e.g., `https://github.com/YOUR_GITHUB_NAME/hydroaggie.github.io`). You can either use the online VScode editor to make changes or download the files to your local machine through a GUI (e.g., [GitHub Desktop](https://github.com/apps/desktop)) or a terminal (e.g., Windows PowerShell).
4. Create a new branch (e.g., `git checkout -b ADD_PROFILE`). **This is important for submitting a Pull Request later.**
5. Inside the new branch and under the `_members` folder, you can add your own profile. The easiest way to create a profile is by duplicating one of the existing member profiles. Edit the information as needed. At the minimum, you should add your email address, a profile picture, and a brief bio. To add your profile picture, you will first need to copy your photo to `assets/img/team` folder and then provide the name of the photo in your profile (i.e., under `profile-->image:`).
6. Once done editing, submit a Pull Request on GitHub. Don't worry about breaking anything. It won't!
7. After I receive a notification about the Pull Request, I will review and merge your changes to current repository. In a few minutes, you should be able to see your profile live on [hydroaggie.github.io](https://hydroaggie.github.io/).

## License

The theme is available as open source under the terms of the [MIT License](https://github.com/alshedivat/al-folio/blob/master/LICENSE).

Originally, **al-folio** was based on the [\*folio theme](https://github.com/bogoli/-folio) (published by [Lia Bogoev](https://liabogoev.com) and under the MIT license). Since then, it got a full re-write of the styles and many additional cool features.
