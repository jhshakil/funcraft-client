import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageUploadDB } from "@/lib/firebaseConfig";
import { v4 } from "uuid";

type Props = {
  onSubmit: (data: string) => void;
};

const EditorImageUpload = ({ onSubmit }: Props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
  });

  useEffect(() => {
    if (acceptedFiles[0]) {
      submit();
    }
  }, [acceptedFiles]);

  const submit = async () => {
    const imgRef = ref(imageUploadDB, `/profilePhoto/${v4()}`);
    await uploadBytes(imgRef, acceptedFiles[0]).then(async (imgData) => {
      await getDownloadURL(imgData.ref).then((val) => {
        onSubmit(val);
      });
    });
  };

  return (
    <>
      <label
        {...getRootProps()}
        className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mt-2"
      >
        <div className=" text-center">
          <div className=" border p-2 rounded-md max-w-min mx-auto">
            <UploadCloud size={20} />
          </div>

          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold">Drag files</span>
          </p>
          {acceptedFiles[0]?.name ? (
            <p className="text-xs text-gray-500">{acceptedFiles[0].name}</p>
          ) : (
            <p className="text-xs text-gray-500">
              Click to upload files &#40;files should be under 10 MB &#41;
            </p>
          )}
        </div>
      </label>

      <Input
        {...getInputProps()}
        id="dropzone-file"
        accept="image/png, image/jpeg"
        type="file"
        className="hidden"
      />
    </>
  );
};

export default EditorImageUpload;
