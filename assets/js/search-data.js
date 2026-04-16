// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A growing collection of research projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "Publications by categories in reversed chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-members",
          title: "Members",
          description: "A list of current and previous group members afflicated with the SCI-Hy group at USU",
          section: "Navigation",
          handler: () => {
            window.location.href = "/team.html";
          },
        },{id: "nav-prospective-students",
          title: "Prospective Students",
          description: "Information regarding prospective students.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/prospective_students/";
          },
        },{id: "dropdown-teaching",
              title: "Teaching",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/teaching/";
              },
            },{id: "dropdown-group-handbook",
              title: "Group Handbook",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "https://groundwater.usu.edu/group_handbook/intro.html";
              },
            },{id: "dropdown-repositories",
              title: "Repositories",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/repositories/";
              },
            },{id: "post-publish-a-python-package-on-conda",
        
          title: "Publish A Python Package on Conda",
        
        description: "A tutorial on how to publish a python package on Conda",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/Publish-Python-Package-on-Conda/";
          
        },
      },{id: "post-how-to-use-latex-in-vscode-as-an-overleaf-alternative",
        
          title: "How to use LaTeX in VScode as an Overleaf alternative",
        
        description: "Tutorial on how to use LaTeX in VScode as an alternative to Overleaf",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/Use-Latex-in-VScode/";
          
        },
      },{id: "post-steps-to-manually-calibrate-a-solinst-levelogger",
        
          title: "Steps to manually calibrate a Solinst Levelogger",
        
        description: "Steps for manually calibrating a Solinst Levelogger using barometric compensation",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/assets/pdf/How_to_Levelogger.pdf";
          
        },
      },{id: "post-a-quick-intro-to-markdown",
        
          title: "A Quick Intro to Markdown",
        
        description: "Slides of a quick introduction to Markdown",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/assets/pdf/How_to_Markdown.pdf";
          
        },
      },{id: "post-tutorial-on-building-a-pflotran-docker-image",
        
          title: "Tutorial on Building a PFLOTRAN Docker Image",
        
        description: "A quick tutorial on how to build a Docker image for running PFLOTRAN and JupyterLab.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/Build-PFLOTRAN-Docker-Image/";
          
        },
      },{id: "post-a-quick-intro-to-git-and-github",
        
          title: "A Quick Intro to Git and GitHub",
        
        description: "Slides of a quick introduction to Git",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/assets/pdf/How_to_Git.pdf";
          
        },
      },{id: "post-a-simple-word-cloud-from-google-scholar",
        
          title: "A simple word cloud from Google Scholar",
        
        description: "Documentation on how to create a word cloud using your Google Scholar profile",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/Make-word-cloud/";
          
        },
      },{id: "post-a-quick-intro-to-note-taking-using-markdown",
        
          title: "A Quick Intro to Note-taking using Markdown",
        
        description: "Slides of a quick introduction to note-taking using Markdown and Obsidian",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/assets/pdf/Intro_to_Markdown.pdf";
          
        },
      },{id: "post-a-zotero-to-obsidian-workflow",
        
          title: "A Zotero to Obsidian Workflow",
        
        description: "A workflow on how to export notes from Zotero to Obsidian",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/A-Zotero-to-Obsidian-Workflow/";
          
        },
      },{id: "post-create-your-academic-website-using-github-pages",
        
          title: "Create Your Academic Website using GitHub Pages",
        
        description: "A tutorial on how to create an academic website for personal and group use.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/Create-Your-Personal-Website-Using-Github-Pages/";
          
        },
      },{id: "post-install-ats-on-chpc",
        
          title: "Install ATS on CHPC",
        
        description: "Documentation on how to install ATS on CHPC system",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/Compile-ATS-on-CHPC/";
          
        },
      },{id: "post-install-ats-using-spack",
        
          title: "Install ATS using Spack",
        
        description: "Documentation on how to install ATS using Spack on CHPC",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/Build-ATS-using-Spack/";
          
        },
      },{id: "post-install-pflotran-on-mac-m1",
        
          title: "Install PFLOTRAN on Mac M1",
        
        description: "Documentation on how to install PFLOTRAN on MacBook M1",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/Install-PFLOTRAN-DFNWorks-Dakota-on-Mac-M1/";
          
        },
      },{id: "post-run-ats-with-singularity-container",
        
          title: "Run ATS with Singularity Container",
        
        description: "Documentation on how to run ATS using Singularity on HPC",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/Running-ATS-using-Singularity/";
          
        },
      },{id: "post-create-customized-rss-feed-for-any-website",
        
          title: "Create Customized RSS Feed for Any Website",
        
        description: "Documentation on how to create customized RSS feed",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/Create-Customized-RSS-Feed-for-Any-Website/";
          
        },
      },{id: "post-a-tutorial-on-how-to-create-a-jupyter-book",
        
          title: "A Tutorial on How to Create a Jupyter Book",
        
        description: "A tutorial on how to create a Jupyter Book",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/Create-Jupyter-Book/";
          
        },
      },{id: "post-create-a-documentation-website-using-mkdocs",
        
          title: "Create A Documentation Website using MkDocs",
        
        description: "A tutorial on how to create documentation page using MkDocs and Github Pages",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/Create-Documentation-Website/";
          
        },
      },{id: "post-publish-a-python-package-on-pypi",
        
          title: "Publish A Python Package on Pypi",
        
        description: "A tutorial on how to publish a python package on Pypi",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/Publish-Python-Package-on-Pypi/";
          
        },
      },{id: "post-working-with-snodas-data",
        
          title: "Working with SNODAS data",
        
        description: "A tutorial on how to download and post-process SNODAS data",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/Postprocess-SNODAS/";
          
        },
      },{id: "post-fuzzy-search-using-fzf",
        
          title: "Fuzzy Search using FZF",
        
        description: "A tutorial on how to use FZF fuzzy search capability to quickly find files",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/FZF-Tutorial/";
          
        },
      },{id: "post-a-vim-plugin-to-easily-comment-files",
        
          title: "A Vim Plugin to Easily Comment Files",
        
        description: "A tutorial on how to use vim-commentary plugin",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/Vim-Commentary-Tutorial/";
          
        },
      },{id: "post-use-rkernel-for-jupyter-notebook",
        
          title: "Use Rkernel for Jupyter Notebook",
        
        description: "A tutorial on how to use Rkernel in Jupyter Notebook",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/Install-Rkernel-for-Jupyter/";
          
        },
      },{id: "post-install-ats-on-linux",
        
          title: "Install ATS on Linux",
        
        description: "Documentation on how to install ATS on Linux system",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/Compile-ATS-Master-on-Linux/";
          
        },
      },{id: "post-install-pvgeo",
        
          title: "Install PVGeo",
        
        description: "Documentation on how to install PVGeo on Mac",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/Install-PVGeo/";
          
        },
      },{id: "post-install-ats-on-mac",
        
          title: "Install ATS on Mac",
        
        description: "Documentation on how to install ATS v1.0 on Mac",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/Compile-ATS-1.0-on-Mac/";
          
        },
      },{id: "post-install-ats-on-nersc",
        
          title: "Install ATS on NERSC",
        
        description: "Documentation on how to install ATS v1.0 on NERSC",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/Compile-ATS-1.0-on-NERSC/";
          
        },
      },{id: "post-install-watershed-workflow",
        
          title: "Install Watershed Workflow",
        
        description: "Documentation on how to install Watershed Workflow",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/Install-Watershed-Workflow/";
          
        },
      },{id: "post-a-git-tutorial",
        
          title: "A Git Tutorial",
        
        description: "Tutorial on how to use Git",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/Git-Tutorial/";
          
        },
      },{id: "post-groundwater-education-resources",
        
          title: "Groundwater Education Resources",
        
        description: "A list of textbooks and resources for hydrogeology",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/Classic-Textbook-in-Hydrogeology/";
          
        },
      },{id: "post-track-changes-in-latex",
        
          title: "Track Changes in LaTex",
        
        description: "Tutorial on how to create a tracked-changes PDF in LaTex",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/Track-Changes-with-Latex/";
          
        },
      },{id: "post-scripting-paraview",
        
          title: "Scripting Paraview",
        
        description: "Tutorial on how to use scripts to batch process files in ParaView",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/Scripting-Paraview/";
          
        },
      },{id: "post-install-tinerator",
        
          title: "Install Tinerator",
        
        description: "Documentation on how to install Tinerator on Mac",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Install-Tinerator/";
          
        },
      },{id: "post-import-github-repo-to-gitlab",
        
          title: "Import GitHub Repo to GitLab",
        
        description: "Documentation on how to import GitHub repos to GitLab",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Import-Github-repo-to-Gitlab/";
          
        },
      },{id: "post-running-jupyter-notebooks-from-remote-servers",
        
          title: "Running Jupyter Notebooks from Remote Servers",
        
        description: "Documentation on how to run Jupyter Notebooks from remote servers through ssh",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Running-Jupyter-from-Remote-Server/";
          
        },
      },{id: "post-a-workaround-for-version-control-jupyter-notebooks",
        
          title: "A workaround for Version Control Jupyter Notebooks",
        
        description: "Documentation on how to use a workaround to version control juptyer notebooks",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Version-control-Jupyter-notebook/";
          
        },
      },{id: "post-install-ats-on-nersc-deprecated",
        
          title: "Install ATS on NERSC (Deprecated)",
        
        description: "Documentation on how to install ATS v0.88 on NERSC",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Compile-ATS-v0.88-on-NERSC/";
          
        },
      },{id: "post-install-pflotran-on-chpc",
        
          title: "Install PFLOTRAN on CHPC",
        
        description: "Documentation on how to install PFLOTRAN on CHPC notchpeak or similar HPC system",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Compile-PFLOTRAN-on-CHPC/";
          
        },
      },{id: "post-install-pflotran-on-nersc",
        
          title: "Install PFLOTRAN on NERSC",
        
        description: "Documentation on how to install PFLOTRAN on NERSC Perlmutter or similar HPC system",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Compile-PFLOTRAN-on-NERSC/";
          
        },
      },{id: "post-run-docker-images-on-mac",
        
          title: "Run Docker Images on Mac",
        
        description: "Documentation on how to run Docker Images on Mac",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Running-Docker-on-Mac/";
          
        },
      },{id: "post-run-docker-images-using-shifter-on-hpc",
        
          title: "Run Docker Images Using Shifter on HPC",
        
        description: "Documentation on how to run Docker Images through Shifter on HPC",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Running-Docker-image-on-NERSC/";
          
        },
      },{id: "post-install-pflotran-on-mac-deprecated",
        
          title: "Install PFLOTRAN on Mac (Deprecated)",
        
        description: "Documentation on how to install PFLOTRAN on Mac",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Compile-PFLOTRAN-on-MAC/";
          
        },
      },{id: "post-create-a-jupyter-kernel",
        
          title: "Create A Jupyter Kernel",
        
        description: "Documentation on how to create a Jupyter Kernel",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Create-conda-environment-in-Jupyter/";
          
        },
      },{id: "post-create-a-jupyter-kernel-on-hpc-deprecated",
        
          title: "Create A Jupyter Kernel on HPC (Deprecated)",
        
        description: "Documentation on how to create a Jupyter Kernel",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2019/Customize-Ipython-Kernel-on-NERSC/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "members-collins-stephenson",
          title: 'Collins Stephenson',
          description: "MS Student",
          section: "Members",handler: () => {
              window.location.href = "/members/Collins_Stephenson";
            },},{id: "members-devon-hill",
          title: 'Devon Hill',
          description: "PhD Student",
          section: "Members",handler: () => {
              window.location.href = "/members/Devon_Hill";
            },},{id: "members-ehsan-ebrahimi",
          title: 'Ehsan Ebrahimi',
          description: "PhD student",
          section: "Members",handler: () => {
              window.location.href = "/members/Ehsan_Ebrahimi";
            },},{id: "members-jihad-othman",
          title: 'Jihad Othman',
          description: "MS student",
          section: "Members",handler: () => {
              window.location.href = "/members/Jihad_Othman";
            },},{id: "members-pamela-claure",
          title: 'Pamela Claure',
          description: "PhD student",
          section: "Members",handler: () => {
              window.location.href = "/members/Pamela_Claure";
            },},{id: "members-pin-shuai",
          title: 'Pin Shuai',
          description: "Profile of Pin Shuai, PI",
          section: "Members",handler: () => {
              window.location.href = "/members/Pin_Shuai";
            },},{id: "members-tarun-agrawal",
          title: 'Tarun Agrawal',
          description: "Postdoctoral Fellow",
          section: "Members",handler: () => {
              window.location.href = "/members/Tarun_agrawal";
            },},{id: "news-the-shuai-cihg-research-group-is-born-today-at-utah-state-university-grin",
          title: 'The Shuai CIHG research group is born today at Utah State University :grin:...',
          description: "",
          section: "News",},{id: "news-welcome-first-student-jihad-othman-to-the-group-clap",
          title: 'Welcome first student, Jihad Othman, to the group! :clap:',
          description: "",
          section: "News",},{id: "news-welcome-two-new-phd-students-pamela-and-ehsan-to-our-group-clap",
          title: 'Welcome two new PhD students, Pamela and Ehsan, to our group! :clap:',
          description: "",
          section: "News",},{id: "news-phd-post-doc-position-in-arctic-hydrology-closed",
          title: 'PhD/post-Doc position in Arctic Hydrology (Closed)',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2023-12-05-phd-position/";
            },},{id: "news-new-article-led-by-dr-shuai-was-published-in-hydrological-processes-congratulations",
          title: 'New article led by Dr. Shuai was published in Hydrological Processes :congratulations:',
          description: "",
          section: "News",},{id: "news-jihad-othman-has-sucessfully-defended-his-ms-thesis-congratulations",
          title: 'Jihad Othman has sucessfully defended his MS thesis! :congratulations:',
          description: "",
          section: "News",},{id: "news-welcome-collins-stephenson-a-new-ms-student-to-our-group-clap",
          title: 'Welcome Collins Stephenson, a new MS student, to our group! :clap:',
          description: "",
          section: "News",},{id: "news-post-doc-position-on-ml-ai-application-in-hydrology-closed",
          title: 'Post-Doc position on ML/AI Application in Hydrology (Closed)',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2025-06-19-postdoc-position/";
            },},{id: "news-new-article-led-by-ehsan-ebrahimi-was-published-in-environmental-modeling-amp-amp-software",
          title: 'New article led by Ehsan Ebrahimi was published in Environmental Modeling &amp;amp;amp; Software...',
          description: "",
          section: "News",},{id: "news-phd-position-in-groundwater-hydrology-and-machine-learning",
          title: 'PhD Position in Groundwater Hydrology and Machine Learning',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/2026-04-16-PhD-position/";
            },},{id: "projects-hydrofabric-enhancement",
          title: 'Hydrofabric Enhancement',
          description: "CIROH: Advance water management-hydrologic model coupling to improve hydrologic forecasting in managed watersheds",
          section: "Projects",handler: () => {
              window.location.href = "/projects/CIROH_hydrofabric/";
            },},{id: "projects-low-flow-prediction",
          title: 'Low-flow Prediction',
          description: "CIROH: Improving low-flow estimates in the NextGen Framework through improved subsurface conceptualization and parameterization",
          section: "Projects",handler: () => {
              window.location.href = "/projects/CIROH_lowflow/";
            },},{id: "projects-integrated-hydrologic-modeling",
          title: 'Integrated Hydrologic Modeling',
          description: "ExaSheds: Advancing Watershed System Science using Machine Learning-Assisted Simulation",
          section: "Projects",handler: () => {
              window.location.href = "/projects/DOE_ExaSheds_project/";
            },},{id: "projects-cold-region-hydro-biogeochemical-processes",
          title: 'Cold Region Hydro-biogeochemical Processes',
          description: "Dynamics of interconnected surface-subsurface flow and reactive transport processes across the hillslope-riparian zone-river corridor continuum of cold, high-latitude watersheds",
          section: "Projects",handler: () => {
              window.location.href = "/projects/DOE_arctic_project/";
            },},{id: "projects-bear-river-water-management-modeling",
          title: 'Bear River Water Management Modeling',
          description: "Advance the representation of groundwater in a water management system model for the Bear River Watershed",
          section: "Projects",handler: () => {
              window.location.href = "/projects/USGS_BearRiver/";
            },},{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=Md_6je0AAAAJ", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/hydroaggie", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
