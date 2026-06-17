const projects = [
    {
        title: "SkillLoop",
        status: "Planned",
        statusClass: "project-status--planned",
        summary: "A developer practice tool built around coding prompts, review feedback, progress tracking, and structured improvement loops.",
        focus: "Full-stack learning tool and developer feedback workflow",
        tech: "ASP.NET Core · C# · Blazor · SQLite",
        role: "Product Design · Full-Stack Development · Documentation",
        caseStudyUrl: "#",
        codeUrl: "#"
    },
    {
        title: "Death Born Combat Slice",
        status: "In Progress",
        statusClass: "project-status--in-progress",
        summary: "A focused combat prototype for a lane-based card game system.",
        focus: "Game systems and combat logic",
        tech: "Godot 4 · C#",
        role: "Development · Systems Design",
        caseStudyUrl: "#",
        codeUrl: "#"
    },
    {
        title: "Procedural Language Machine",
        status: "Planned",
        statusClass: "project-status--planned",
        summary: "A C# language-generation system built around reusable word banks and templates.",
        focus: "Tools and structured generation",
        tech: "C# · .NET",
        role: "Architecture · Development",
        caseStudyUrl: "#",
        codeUrl: "#"
    }
];

let currentProjectIndex = 0;

const projectTitle = document.querySelector(".project-title");
const projectStatus = document.querySelector(".project-status");
const projectSummary = document.querySelector(".project-summary");
const projectMeta = document.querySelector(".project-meta");
const projectActions = document.querySelector(".project-actions");

const previousButton = document.querySelector(".project-control-prev");
const nextButton = document.querySelector(".project-control-next");

const projectCurrent= document.querySelector(".project-current");
const projectTotal = document.querySelector(".project-total");

const projectCard = document.querySelector(".project-card");

function renderProject() {
    const project = projects[currentProjectIndex];

    projectTitle.textContent = project.title;

    projectStatus.textContent = project.status;
    projectStatus.className = `project-status ${project.statusClass}`;

    projectSummary.textContent = project.summary;

    projectMeta.innerHTML = `
        <p class="project-meta-item"><strong>Focus:</strong> ${project.focus}</p>
        <p class="project-meta-item"><strong>Tech:</strong> ${project.tech}</p>
        <p class="project-meta-item"><strong>Role:</strong> ${project.role}</p>
    `;

    projectActions.innerHTML = `
        <span class="button button-primary button-disabled" href="${project.caseStudyUrl}">Case Study Coming Soon</span>
        <span class="button button-secondary button-disabled" href="${project.codeUrl}">Code Coming Soon</span>
    `;

    projectCurrent.textContent = String(currentProjectIndex + 1).padStart(2, "0");
    projectTotal.textContent = String(projects.length).padStart(2, "0");
}

function showPreviousProject() {
    const nextIndex = 
        currentProjectIndex === 0
            ? projects.length - 1
            : currentProjectIndex - 1;
    
    changeProject(nextIndex, "prev");
}

function showNextProject() {
    const nextIndex =
        currentProjectIndex === projects.length - 1
            ? 0
            : currentProjectIndex + 1;

    changeProject(nextIndex, "next");
}

let isChangingProject = false;

function changeProject(nextIndex, direction) {
    if (isChangingProject) {
        return;
    }

    isChangingProject = true;

    const outClass =
        direction === "next"
            ? "is-shuffling-out-next"
            : "is-shuffling-out-prev";

    const inClass =
        direction === "next"
            ? "is-shuffling-in-next"
            : "is-shuffling-in-prev";

    projectCard.classList.add(outClass);

    setTimeout(() => {
        currentProjectIndex = nextIndex;
        renderProject();

        projectCard.classList.remove(outClass);
        projectCard.classList.add(inClass);

        requestAnimationFrame(() => {
            projectCard.classList.remove(inClass);
        });

        setTimeout(() => {
            isChangingProject = false;
        }, 220);
    }, 220);
}

previousButton.addEventListener("click", showPreviousProject);
nextButton.addEventListener("click", showNextProject);

renderProject();

