import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormInputProps = {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
};

function FormInput({
  label,
  name,
  type,
  defaultValue,
  placeholder,
  required = true,
}: FormInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        className="focus:placeholder:opacity-0 placeholder:transition-opacity duration-200  placeholder:opacity-40  bg-background"
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default FormInput;
