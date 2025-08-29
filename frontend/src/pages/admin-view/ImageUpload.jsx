import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, FileVolume, UploadCloudIcon, X } from "lucide-react";
import { useRef } from "react";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedimageUrl,
  setUploadedimageUrl,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedimageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setUploadedimageUrl("");
    if (inputRef.current) inputRef.current.value = "";
  };

  function handleDragOver(e) {
    e.preventDefault();
  }


  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }


  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4">
      <Label
        htmlFor="image-upload"
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Upload Product Image
      </Label>

      <div 
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 flex flex-col items-center justify-center transition hover:border-gray-400 dark:hover:border-gray-500">
        {/* Hidden input */}
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          ref={inputRef}
          className=""
          onChange={handleImageFileChange}
        />

        {/* If no image is uploaded */}
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-40 cursor-pointer"
          >
            <UploadCloudIcon className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">
              Click to upload or drag and drop
            </span>
          </Label>
        ) : (
          // If image is uploaded → show preview
          <div className="relative w-full flex flex-col items-center justify-between">
           <div className="w-8 text-primary mr-2 h-8 mt-2">
                <FileIcon className="w-8 h-8 text-primary mr-2" />
           </div>
           <p className="text-sm font-medium">{imageFile.name}</p>
           <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-foreground" onClick={handleRemoveImage} >
            <X className="h-4 w-4" onClick={handleRemoveImage} />
            <span className="sr-only">Remove File</span>
           </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
