import axios from "axios"
import { useEffect, useState } from "react"
import { ENDPOINTS } from "../utils/endpoint"
import { handleFieldsError } from "../utils/handleFieldsError"
import { useDispatch } from "react-redux"
import { setUser } from "../feature/userSlice"
import { useSelector } from "react-redux"
import { removeUser } from "../feature/userSlice"
export const useAuth = () => {
    const [fieldErrors, setFieldErrors] = useState({})
    const {
        access, refresh
    } = useSelector((state) => state.user)

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const register = async (form) => {
        const { username, email, password, confirmPassword } = form
        try {
            setIsLoading(true)
            const response = await axios.post(ENDPOINTS.REGISTER, {
                username, email, password1: password, password2: confirmPassword
            })
            const data = response.data

            return { success: true, data }
        } catch (error) {
            if (error.response) {
                if (error.response?.data) {
                    const fieldsError = handleFieldsError(error.response.data)
                    setFieldErrors(fieldsError)
                    return { success: false, errors: Object.values(fieldsError) }
                }
                console.error("Register API error:", error)
                return { success: false, errors: [error.message] }
            }
        }
        finally {
            setIsLoading(false)
        }
    }

    const login = async (data) => {
        const { username, email, password } = data
        try {
            setIsLoading(true)
            const response = await axios.post(ENDPOINTS.LOGIN, {
                username, email, password
            })
            const data = response.data
            console.log(data)
            dispatch(setUser(data))
            return { success: true, data }
        } catch (error) {
            if (error.response) {
                if (error.response?.data) {
                    const fieldsError = handleFieldsError(error.response.data)
                    setFieldErrors(fieldsError)
                    return { success: false, errors: Object.values(fieldsError) }
                }
            }
            console.error("Login API error:", error)
            return { success: false, errors: [error.message] }
        }
        finally {
            setIsLoading(false)
        }
    }
    const logout = async () => {
        try {
            setIsLoading(true)
            await axios.post(
                ENDPOINTS.LOGOUT,
                { refresh },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: access ? `Bearer ${access}` : "",
                    },
                }
            )
            dispatch(removeUser())
            return { success: true }
        } catch (error) {
            console.error("Logout API error:", error)
            if (error.response?.data?.detail) {
                return { success: false, error: error.response.data.detail }
            }
            return { success: false, error: error.message }
        } finally {
            setIsLoading(false)
        }
    }
    return { register, login, fieldErrors, isLoading, logout }
}
