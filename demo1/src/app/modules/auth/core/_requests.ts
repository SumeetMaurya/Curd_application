import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = "http://localhost:8080/api"

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/users/verify_token`
export const GET_USER_BY_ACCESSTOKEN_URL2 = `${API_URL}/auth/verify_token`
export const LOGIN_URL = `${API_URL}/auth`
export const REGISTER_URL = `${API_URL}/users`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  })
}

// Server should return AuthModel
export function register(
  name: string,
  age: string,
  salary: string,
  email: string,
  // countr: string,
  // state: string,
  // cit: string,
  password: string,
  // password_confirmation: string
) {
  return axios.post("http://localhost:8080/api/users", {
    name,
    age,
    salary,
    email,
    // countr,
    // state,
    // cit,
    password,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}

export function getUserByToken2(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL2, {
    api_token: token,
  })
}