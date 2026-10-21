const projects = {
    observability: {
        tags: 'Prometheus / Grafana / Docker',
        title: 'Observability',
        summary: 'Self-hosted observability infrastructure using Prometheus and Grafana.',
        description: 'A self-hosted observability stack built with Prometheus and Grafana to monitor local and cloud workloads, surface anomalies quickly, and support faster incident response through actionable dashboards and alerts.',
        role: 'Infrastructure',
        industry: 'Cloud',
        team: 'Independent',
        image: 'Images/observability.jpg',
        media: [
            { type: 'image', source: 'Images/observability.jpg', alt: 'Observability project preview' },
            { type: 'image', source: 'Images/cover.png', alt: 'Observability supporting image' }
        ],
        impact: 'Incidents are identified and notified quickly, helping teams resolve issues faster and reduce mean time to recovery.'
    },
    'channel-management': {
        tags: 'FilamentPHP / Laravel / Docker',
        title: 'Sales CRM',
        summary: 'A sales tracking platform for managing leads and performance metrics.',
        description: 'A comprehensive sales tracking platform that empowers sales representatives to efficiently manage and monitor leads, deals, and performance metrics in real time. Deployed through Laravel Sail and Cloudflared Zero Tunnel.',
        role: 'Full-stack Development',
        industry: 'Sales Operations',
        team: 'Independent',
        image: 'Images/channel.jpg',
        media: [
            { type: 'image', source: 'Images/channel.jpg', alt: 'Sales CRM project preview' },
            { type: 'image', source: 'Images/contacts.jpg', alt: 'Sales CRM contacts screen' }
        ],
        impact: 'The platform makes it easier to track leads, deals, and sales performance in one place, giving representatives clearer visibility into their work.'
    },
    shroomguard: {
        tags: 'Deep Learning / Firebase / Amazon Web Services',
        title: 'Design of a Maturity Stage Classification using Instance Segmentation',
        summary: 'A deep learning model that categorizes mushroom caps to improve harvesting.',
        description: 'The main objective of this project is to design a maturity stage classification for mushroom cultivation using the instance segmentation algorithm. The system captures images of white oyster mushrooms and uses instance segmentation to classify them among three classes—ready, not ready, or overdue.',
        role: 'Cloud Architecture',
        industry: 'Intelligent systems',
        team: '3 members',
        image: 'Images/ShroomGuard.png',
        media: [
            { type: 'image', source: 'Images/ShroomGuard.png', alt: 'ShroomGuard project preview' },
            { type: 'image', source: 'Images/shroom_deploy.jpg', alt: 'ShroomGuard deployment screen' },
            { type: 'video', source: 'Images/shroom_demo.mp4', alt: 'ShroomGuard demonstration video' }
        ],
        impact: 'The model supports more accurate harvesting decisions by identifying the right maturity window, helping prevent missed periods when mushrooms are no longer at their optimal harvest stage. Exhibited 98% accuracy in identifying growth stages, with results validated by Bureau of Plant Industry experts.'
    },
    thermodeliver: {
        tags: 'Arduino / C++ / Embedded Systems',
        title: 'Design of a Temperature Regulation  using Proportional-Integral-Derivative',
        summary: 'A device that maintains optimal food temperature during delivery using PID.',
        description: 'A device that features two DHT22 sensors situated on the hot and cool side respectively. These sensors allow the temperature to be adjusted using PID, based on the user-defined setpoint configured through the cloud dashboard.',
        role: 'Software Architecture',
        industry: 'Embedded systems',
        team: '4 members',
        image: 'Images/ThermoDeliver.png',
        media: [
            { type: 'image', source: 'Images/ThermoDeliver.png', alt: 'ThermoDeliver project preview' },
            { type: 'image', source: 'Images/thermodeliver_dash.jpg', alt: 'ThermoDeliver dashboard' }
        ],
        impact: 'The temperature regulation system helps improve customer satisfaction by ensuring food arrives at the intended hot or cold temperature.'
    }
};

const projectId = new URLSearchParams(window.location.search).get('project');
const project = projects[projectId] || projects.observability;

document.querySelector('.project-back-link').addEventListener('click', event => {
    event.preventDefault();
    const destination = event.currentTarget.href;
    document.body.classList.add('page-transition-out');
    setTimeout(() => {
        window.location.href = destination;
    }, 280);
});

document.title = `${project.title} | Bryan Paul`;
document.getElementById('project-tags').textContent = project.tags;
document.getElementById('project-title').textContent = project.title;
document.getElementById('project-summary').textContent = project.summary;
document.getElementById('project-description').textContent = project.description;

const facts = [
    ['My role', project.role],
    ['Industry', project.industry]
];

document.getElementById('project-facts').innerHTML = facts
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
    .join('');

document.getElementById('project-gallery').innerHTML = (project.gallery || [])
    .map(image => `<img src="${image}" alt="${project.title} supporting screen">`)
    .join('');

document.getElementById('project-impact-content').textContent = project.impact;

const projectHeroContent = document.getElementById('project-hero-content');
const projectMediaPrevious = document.getElementById('project-media-previous');
const projectMediaNext = document.getElementById('project-media-next');
let activeMediaIndex = 0;

if (project.media && project.media.length > 1) {
    const renderProjectMedia = () => {
        const media = project.media[activeMediaIndex];
        projectHeroContent.classList.add('project-media-is-changing');

        setTimeout(() => {
            projectHeroContent.innerHTML = media.type === 'video'
                ? `<video controls preload="metadata" aria-label="${media.alt}"><source src="${media.source}" type="video/mp4"></video>`
                : `<img src="${media.source}" alt="${media.alt}">`;
            projectHeroContent.classList.remove('project-media-is-changing');
        }, 180);
    };

    const showMedia = offset => {
        activeMediaIndex = (activeMediaIndex + offset + project.media.length) % project.media.length;
        renderProjectMedia();
    };

    projectMediaPrevious.addEventListener('click', () => showMedia(-1));
    projectMediaNext.addEventListener('click', () => showMedia(1));
    renderProjectMedia();
} else {
    projectHeroContent.innerHTML = `<img src="${project.image}" alt="${project.title}">`;
    projectMediaPrevious.remove();
    projectMediaNext.remove();
}
