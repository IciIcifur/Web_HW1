const fetchProjects = async () => {
    try {
        const response = await fetch('./projects/projects.json');
        if (response.ok) {
            createTabs((await response.json()).projects);
        }
    } catch (error) {
        console.error(error);
    }
}

const createTabs = (projects) => {
    const tabsMenu = document.getElementById('tabs');

    projects.forEach((project, index) => {
        const tab = document.createElement('button')
        tab.classList.add('tab');
        tab.textContent = project.title;
        tab.addEventListener('click', () => {
            openTab(project)
        });
        tabsMenu.appendChild(tab);

        if (index === 0) {
            tab.click()
        }
    })


}

const openTab = (project) => {
    const activeTab = document.querySelector('.tab.active');
    const allTabs = document.querySelectorAll('.tab');

    if (activeTab?.textContent !== project.title) {
        if (activeTab) activeTab.classList.remove('active')
        allTabs.forEach((tab) => {
            if (tab.textContent === project.title) tab.classList.add('active')
        })

        const projectTitle = document.getElementById('project_title');
        projectTitle.textContent = project.title;
        projectTitle.href = project.link;

        const projectDescription = document.getElementById('description');
        projectDescription.textContent = project.description;

        const projectGallery = document.getElementById('gallery');
        projectGallery.innerHTML = '';

        project.imageUrls.forEach((url) => {
            const image = document.createElement('img')
            image.src = `./projects/${project.title}/${url}`;
            image.alt = url;
            image.classList.add('project-image')
            projectGallery.appendChild(image)
        })
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    await fetchProjects();
})