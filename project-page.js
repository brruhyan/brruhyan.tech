const projects = {
    observability: {
        tags: 'Prometheus / Grafana / Docker',
        title: 'Observability',
        summary: 'Self-hosted observability infrastructure using Prometheus and Grafana.',
        description: 'A self-hosted observability stack built with Prometheus and Grafana to monitor local and cloud workloads, surface anomalies quickly, and support faster incident response through actionable dashboards and alerts.',
        role: 'Infrastructure',
        industry: 'Cloud',
        team: 'Independent',
        image: 'Images/observability.jpg'
    },
    'channel-management': {
        tags: 'FilamentPHP / Laravel / Docker',
        title: 'Sales CRM',
        summary: 'A sales tracking platform for managing leads and performance metrics.',
        description: 'A comprehensive sales tracking platform that empowers sales representatives to efficiently manage and monitor leads, deals, and performance metrics in real time. Deployed through Laravel Sail and Cloudflared Zero Tunnel.',
        role: 'Full-stack Development',
        industry: 'Sales Operations',
        team: 'Independent',
        image: 'Images/channel.jpg'
    },
    shroomguard: {
        tags: 'Deep Learning / Firebase / Amazon Web Services',
        title: 'Design of a Maturity Stage Classification using Instance Segmentation',
        summary: 'A deep learning model that categorizes mushroom caps to improve harvesting.',
        description: 'An instance segmentation model that detects harvest-ready mushroom caps and sends notifications via Firebase Cloud Messaging. It achieved 98% accuracy in identifying growth stages, with results validated by Bureau of Plant Industry experts.',
        role: 'Cloud Architecture',
        industry: 'Intelligent systems',
        team: '3 members',
        image: 'Images/ShroomGuard.png'
    },
    thermodeliver: {
        tags: 'Arduino / C++ / Embedded Systems',
        title: 'Design of a Temperature Regulation  using Proportional-Integral-Derivative',
        summary: 'A device that maintains optimal food temperature during delivery using PID.',
        description: 'A device that features two DHT22 sensors situated on the hot and cool side respectively. These sensors allow the temperature to be adjusted using PID, based on the user-defined setpoint configured through the cloud dashboard.',
        role: 'Software Architecture',
        industry: 'Embedded systems',
        team: '4 members',
        image: 'Images/ThermoDeliver.png'
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

const projectImage = document.getElementById('project-image');
projectImage.src = project.image;
projectImage.alt = project.title;

const facts = [
    ['My role', project.role],
    ['Industry', project.industry],
    ['Team', project.team]
];

document.getElementById('project-facts').innerHTML = facts
    .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
    .join('');

document.getElementById('project-gallery').innerHTML = (project.gallery || [])
    .map(image => `<img src="${image}" alt="${project.title} supporting screen">`)
    .join('');
