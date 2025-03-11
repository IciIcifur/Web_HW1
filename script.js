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


        const projectContainer = document.getElementById('current_project');
        projectContainer.innerHTML = '';

        project.imageUrls.forEach((url) => {
            const image = document.createElement('img')
            image.src = `./projects/${project.title}/${url}`;
            image.alt = url;
            image.classList.add('project-image')
            projectContainer.appendChild(image)
        })
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    await fetchProjects();
})

/*
document.addEventListener('DOMContentLoaded', () => {
    // Функция для открытия вкладки и загрузки содержимого
    function openTab(project) {
        const tablinks = document.querySelectorAll('.tablinks');
        tablinks.forEach(tab => {
            tab.classList.remove('active');
        });
        event.currentTarget.classList.add('active');

        fetch(`projects/${project}`)
            .then(response => response.text())
            .then(data => {
                const tabContentContainer = document.getElementById('tab-content');
                tabContentContainer.innerHTML = data;
                tabContentContainer.style.display = 'block';
            });
    }

    // Создание вкладок при загрузке страницы
    createTabs();
});*/
