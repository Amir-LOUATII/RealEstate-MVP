import { Label } from "../ui/label";
import { Input } from "../ui/input";

function ImageInput({
  label = "image",
  name = "image",
  required = true,
  lang = "en-us",
}: {
  label?: string;
  name?: string;
  required?: boolean;
  lang?: string;
}) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        lang={lang}
        required={required}
        accept="image/*"
      />
    </div>
  );
}

export default ImageInput;
