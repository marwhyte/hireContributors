import { toast } from "react-toastify";

export const copyEmail = (canidateName: string, canidatePackage: string) => {
  var email = localStorage.getItem("emailTemplate");
  if (email === null || email === undefined) {
    const defaultString = `Hello ${canidateName},\n I noticed your work at ${canidatePackage} and was impressed, would you be interested in having a conversion about possible careers? If so, reach out!\nSincerely`;
    toast.warning(
      "⚠️ Using Default Email Template, it is recommended to create your own Template!",
      {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
    toast.success("📧Template email with canidate info copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigator.clipboard.writeText(defaultString);
  } else {
    const packageReplace = email.replace(/{{PACKAGENAME}}/g, canidatePackage);
    const nameReplace = packageReplace.replace(/{{NAME}}/g, canidateName);
    navigator.clipboard.writeText(nameReplace);
    toast.success(
      "📧Your Customized Email with canidate info was copied to clipboard",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }
};
