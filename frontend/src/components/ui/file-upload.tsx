// components/ui/file-upload.tsx
import { Upload } from "lucide-react";
import { useCallback } from "react";

export const FileUpload = ({ onChange, className = "" }: any) => {
  const handleFileChange = useCallback(
    (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        onChange(file);
      }
    },
    [onChange]
  );

  return (
    <label
      className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-orange-300 transition-colors ${className}`}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <Upload className="w-8 h-8 mb-3 text-orange-500" />
        <p className="mb-2 text-sm text-orange-700">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-orange-500">PNG, JPG, GIF (MAX. 5MB)</p>
      </div>
      <input type="file" className="hidden" onChange={handleFileChange} />
    </label>
  );
};
