async function httpGetPlanets() {
    const response = await fetch("http://localhost:8000/api/planets");
    const planets = await response.json();
    return planets;
}

async function httpGetLaunches() {
    const response = await fetch("http://localhost:8000/api/launches");
    const launches = await response.json();
    return launches;
}

async function httpSubmitLaunch(launch) {
    try {
        return await fetch("http://localhost:8000/api/launches", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(launch),
        });
    } catch (error) {
        console.log(error);
        return {
            ok: false,
        };
    }
}

async function httpAbortLaunch(id) {
    try {
        return await fetch(`http://localhost:8000/api/launches/${id}`, {
            method: "delete",
        });
    } catch (error) {
        console.log(error);
        return {
            ok: false,
        };
    }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
