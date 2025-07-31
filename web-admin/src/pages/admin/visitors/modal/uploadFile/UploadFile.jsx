import { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";

export default function UploadFile({ setPhotoBase64, photo }) {
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let file = e.files[0];

    _totalSize += file.size || 0;

    setTotalSize(_totalSize);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoBase64(reader.result); // salva a imagem como base64 no estado local
    };
    reader.readAsDataURL(file);
  };

  const onTemplateUpload = (e) => {
    alert(e);
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 50000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div className={`flex gap-2 ${className}`}>
        {chooseButton}
        {/* {uploadButton} */}
        {cancelButton}
        <div className="flex flex-col align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 5 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            className="w-full h-2"
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex flex-col align-items-center flex-wrap">
        <div className="h-50 overflow-hidden mb-5">
        <img
          alt={file.name}
          role="presentation"
          src={file.objectURL}
          className="w-full object-cover h-full"
        />
        </div>
        <span className="flex flex-column text-left ml-3">
          {file.name}
          <small>{new Date().toLocaleDateString()}</small>
        </span>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex flex-col align-items-center h-50 relative">
        <p className="z-10 text-center w-full mb-5">Drag and Drop Image Here</p>
        <div className="flex justify-center items-center w-full bg-gray-100 overflow-hidden">
          {photo ? (
            <img src={photo} alt="Visitor Image" className="object-cover w-full"></img>
          ) : (
            <i className="pi pi-image mt-3 p-5 bg-gray-100 text-7xl"></i>
          )}
        </div>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined h-12 w-12",
  };
  // const uploadOptions = {
  //   icon: "pi pi-fw pi-cloud-upload",
  //   iconOnly: true,
  //   className:
  //     "custom-upload-btn p-button-success p-button-rounded p-button-outlined h-12 w-12",
  // };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined h-12 w-12",
  };

  return (
    <div>
      <FileUpload
        // props
        mode={"advanced"}
        customUpload
        ref={fileUploadRef}
        name="uploadVisitor"
        accept="image/*"
        maxFileSize={5120000}
        // functions
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        uploadHandler={(e) => {
          alert("U dont need upload function, it isnt your task");
          // const file = e.files[0];
          // const reader = new FileReader();
          // reader.onloadend = () => {
          //   setPhotoBase64(reader.result); // salva a imagem como base64 no estado local
          // };
          // reader.readAsDataURL(file);
        }}
        // templates
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        cancelOptions={cancelOptions}
      />
    </div>
  );
}
