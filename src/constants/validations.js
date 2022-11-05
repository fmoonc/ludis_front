import * as yup from "yup";

export const validationEditUser = yup
  .object({
    nif: yup
      .string("El NIF deben ser una cadena de texto")
      .required("El NIF es requerido")
      .matches(/^\d{8}[a-zA-Z]$/, "El NIF no es correcto"),
    name: yup
      .string("El nombre deben ser una cadena de texto")
      .required("El nombre es requerido")
      .matches(/^\s*\S[\s\S]*$/, "Debes introducir al menos una letra"),
    surnames: yup
      .string("Los apellidos deben ser una cadena de texto")
      .required("Los apellidos son requeridos")
      .matches(/^\s*\S[\s\S]*$/, "Debes introducir al menos una letra"),
  })
  .required();

export const validationCreateUser = yup
  .object({
    email: yup
      .string("El Email deben ser una cadena de texto")
      .required("El Email es requerido")
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        "El Email no es válido"
      ),
    password: yup
      .string("La contraseña debe ser una cadena de texto")
      .required("La contraseña es requerida")
      .min(6, "Debe ser de al menos 6 caracteres"),
    nif: yup
      .string("El NIF deben ser una cadena de texto")
      .required("El NIF es requerido")
      .matches(/^\d{8}[a-zA-Z]$/, "El NIF no es correcto"),
    name: yup
      .string("El nombre deben ser una cadena de texto")
      .required("El nombre es requerido")
      .matches(/^\s*\S[\s\S]*$/, "Debes introducir al menos una letra"),
    surnames: yup
      .string("Los apellidos deben ser una cadena de texto")
      .required("Los apellidos son requeridos")
      .matches(/^\s*\S[\s\S]*$/, "Debes introducir al menos una letra"),
    role: yup
      .string("El Rol debe ser texto")
      .required("Rol es requerido")
      .oneOf(["admin", "client"]),
  })
  .required();

export const validationChangePassword = yup
  .object({
    email: yup
      .string("El Email deben ser una cadena de texto")
      .required("El Email es requerido")
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        "El Email no es válido"
      ),
  })
  .required();

export const validationLogin = yup
  .object({
    email: yup
      .string("El Email deben ser una cadena de texto")
      .required("El Email es requerido")
      .matches(
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        "El Email no es válido"
      ),
    password: yup
      .string("La contraseña deben ser una cadena de texto")
      .required("La contraseña es requerida"),
  })
  .required();

export const validationUpdatedRol = yup
  .object({
    role: yup
      .string("El Rol deben ser una cadena de texto")
      .required("El Rol es requerido"),
  })
  .required();

export const validationCreateRol = yup
  .object({
    name: yup
      .string("El Nombre deben ser una cadena de texto")
      .required("El Nombre del Rol es requerido"),
  })
  .required();
