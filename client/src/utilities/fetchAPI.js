const fetchAPI = async (url, method, body) => {
    try {
        const res = await fetch(url, {
            method,
            body,
            headers: { "Content-Type": "application/json" },
        });
        if (res.status !== 200) {
            throw new Error("Something went wrong.");
        }
        const data = await res.json();
        console.log(`response from server: ${data.status}, ${data.message}`);
    } catch (err) {
        console.error(`error from server: ${err.message}`);
    }
}

export default fetchAPI;