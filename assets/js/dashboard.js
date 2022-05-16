const appDashboard = {
    //^-------------------- Variables
    body: document.querySelector('body'),
    //^-------------------- Init
    init() {
        this.renderDashboard();
    },
    //^--------------------Methods
    renderDashboard() {
        const dashboardElement = document.createElement('main');
        dashboardElement.setAttribute('id','dashboard');

        appDashboard.body.appendChild(dashboardElement);

        return dashboardElement;
    }
};

export { appDashboard };