const appDashboard = {
    //^-------------------- Variables
    body: document.querySelector('body'),
    //^-------------------- Init
    init() {
        this.renderDashboard();
    },
    //^--------------------Methods
    renderDashboard() {
        const dashboardElement = document.createElement('section');
        dashboardElement.setAttribute('id','dashboard');

        appDashboard.body.appendChild(dashboardElement);
    }
};

export { appDashboard };