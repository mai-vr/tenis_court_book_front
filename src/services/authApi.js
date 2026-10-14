const API_URL = 'https://tenis-court-book.onrender.com/api/v1'

const registerUser = async (newUserData) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUserData)
        })

        const data = await response.json()

        if (!response.ok) {
            throw data
        }

        return data

    } catch (error) {
        console.log(error.message)
        throw error
    }
}

const loginUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })

        const data = await response.json()
        if (!response.ok) {
            throw data
        }

        return data

    } catch (error) {
        console.log(error)
        throw error
    }
}

export {registerUser, loginUser}