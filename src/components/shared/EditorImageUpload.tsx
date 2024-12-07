import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { type Editor } from "@tiptap/react";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageUploadDB } from "@/lib/firebaseConfig";
import { v4 } from "uuid";
import { UploadCloud } from "lucide-react";
import { Input } from "../ui/input";

type Props = {
  open: boolean;
  closeFn: () => void;
  editor: Editor;
};

const EditorImageUpload = ({ open, closeFn, editor }: Props) => {
  const closeDialog = (value: boolean) => {
    if (value === false) {
      closeFn();
    }
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
  });

  const submit = async () => {
    if (acceptedFiles[0]) {
      const imgRef = ref(imageUploadDB, `/postBody/${v4()}`);
      await uploadBytes(imgRef, acceptedFiles[0]).then(async (imgData) => {
        await getDownloadURL(imgData.ref).then((val) => {
          editor
            .chain()
            .focus()
            .setImage({
              src: val,
              alt: "Post Image",
            })
            .run();
          closeDialog(false);
        });
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => closeDialog(value)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <div>
            <p className="text-sm">Upload Image</p>
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
                  <p className="text-xs text-gray-500">
                    {acceptedFiles[0].name}
                  </p>
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
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditorImageUpload;
