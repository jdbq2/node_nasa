async function httpGetPlanets() {
    const response = await fetch("http://localhost:8000/api/planets");
    const { planets } = await response.json();
    return planets;
}

async function httpGetLaunches() {
    const response = await fetch("http://localhost:8000/api/launches");
    const { launches } = await response.json();
    return launches;
}

async function httpSubmitLaunch(launch) {
    // TODO: Once API is ready.
    // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
    // TODO: Once API is ready.
    // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
