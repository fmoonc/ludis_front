import useNotification from "@/hooks/useNotification";
import { useRef, useState } from "react";

export default function useAvatar() {
  const avatarRef = useRef(null);
  const { showNotification } = useNotification();
  const [base64, setBase64] = useState(null);

  const handleChangeAvatar = () => {
    const avatar = avatarRef.current.files[0];

    if (!avatar) {
      return showNotification({
        type: "error",
        msg: "Error de lectura de imagen",
      });
    }
    const formato = avatar.type;
    if (
      formato !== "image/png" &&
      formato !== "image/jpeg" &&
      formato !== "image/jpg" &&
      formato !== "image/webp"
    ) {
      return showNotification({
        type: "error",
        msg: "Error de formato",
      });
    }
    let file = new FileReader();
    /* Evento al finalizar la carga */
    file.onload = function ({ target: { result } }) {
      setBase64(result);
    };
    /* Evento al dal error */
    file.onerror = function ({ target: { error } }) {
      return showNotification({ type: "error", msg: error });
    };
    file.readAsDataURL(avatar);
  };

  const handleCleanAvatar = () => {
    setBase64(null);
    document.getElementById("avatar").value = "";
  };

  const getBase64Image = (imgUrl, callback) => {
    if (imgUrl === null) {
      callback(null);
    } else {
      let img = new Image();

      img.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        callback(dataURL); // the base64 string
      };

      img.setAttribute("crossOrigin", "anonymous");
      img.src = imgUrl;
    }
  };

  return {
    avatarRef,
    handleChangeAvatar,
    handleCleanAvatar,
    base64,
    setBase64,
    getBase64Image,
  };
}
