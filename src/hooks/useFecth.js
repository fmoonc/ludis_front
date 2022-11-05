import { useRecoilState } from "recoil";
import { authState } from "@/stores/auth-store";
import { useNavigate } from "react-router-dom";

export default function useFetch(path_url) {
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  function request(method) {
    return (pathname, body) => {
      const requestOptions = {
        method,
        headers: authHeader(),
      };
      if (body) {
        //requestOptions.headers["Accept"] = "*/*";
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
      }
      return fetch(path_url + pathname, requestOptions)
        .then(handleResponse)
        .catch((error) => {
          return { status: "error", data: error };
        });
    };
  }

  function authHeader() {
    if (auth && auth.token) {
      return { Authorization: `Bearer ${auth.token}` };
    } else {
      return {};
    }
  }

  function handleResponse(response) {
    return response.text().then((text) => {
      const { data, meta, error } = text && JSON.parse(text);
      if (error === "Unauthorized") {
        setAuth(null);
        localStorage.setItem("auth", JSON.stringify(null));
        return navigate("/login?tokenExpired=success");
      }

      if (!response.ok) {
        if ([404].includes(response.status)) {
          throw new Error(response?.statusText);
        }
        if ([400].includes(response.status)) {
          let res = "";
          for (const property in data) {
            console.error(`${property}: ${data[property]}`);
            res = res + data[property] + " ";
          }
          return { status: "error", data: res, meta: meta };
        }
        if ([403].includes(response.status)) {
          return { status: "error", data: data, meta: meta };
        }
        if ([401].includes(response.status)) {
          return { status: "error", data: data, meta: meta };
        }
        return Promise.reject(data);
      }
      return { status: "success", data: data, meta: meta };
    });
  }

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
  };
}
