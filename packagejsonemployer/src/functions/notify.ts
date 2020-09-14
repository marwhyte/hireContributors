import { toast } from "react-toastify";

export const notifyNoUpload = () =>
  toast.error("👮 Upload your package.JSON first!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
export const notify = () =>
  toast.error("👮 Must be Package.json with dependencies", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
