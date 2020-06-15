import * as React from "react";
import { FilePond, registerPlugin, File } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  updateJSON: (text: string) => void;
}
//type: "application/json"

const UploadFile: React.FC<Props> = (props: Props) => {
  const [files, setFiles] = React.useState([]);

  const notify = () =>
    toast.error("👮 Must be a JSON file!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  React.useEffect(() => {
    if (files[0] !== undefined) {
      //@ts-ignore
      if (files[0].fileType !== "application/json") {
        notify();
        setFiles([]);
      } else {
        //@ts-ignore
        const file = files[0].file;
        const reader = new FileReader();

        reader.onload = (event: any) => {
          const textFile = event.target.result;
          console.log(textFile);
          props.updateJSON(textFile);
        };
        reader.onerror = (event: any) => {
          alert(event.target.error.name);
        };
        reader.readAsText(file);
      }
    }
  }, [files]);

  return (
    <div className="uploadFile">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <FilePond
        className="fileUploader"
        files={files}
        allowMultiple={false}
        onremovefile={() => {
          props.updateJSON("");
          setFiles([]);
        }}
        //@ts-ignore
        onupdatefiles={setFiles}
        labelIdle='Drag & Drop your Package.JSON file or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
};

export default UploadFile;
