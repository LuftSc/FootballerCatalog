export interface FootballerRequest {
    firstName: string,
    lastName: string,
    gender: string,
    birthDate: string,
    team: string,
    country: string
}

export const getAllFootballers = async () => {
    const response = await fetch("https://localhost:7122/Footballers");

    return response.json();
}

export const createFootballer = async (footballerRequest: FootballerRequest) => {
    await fetch("https://localhost:7122/Footballers", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(footballerRequest),
    })
}

export const updateFootballer = async (id: string, footballerRequest: FootballerRequest) => {
    await fetch(`https://localhost:7122/Footballers/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(footballerRequest),
    })
}

export const deleteFootballer = async (id: string) => {
    await fetch(`https://localhost:7122/Footballers/${id}`, {
        method: "DELETE",
    })
}