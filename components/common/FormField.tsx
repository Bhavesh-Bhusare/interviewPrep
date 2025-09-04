import React, { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";

  enableVisibilityToggle?: boolean;
}

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  enableVisibilityToggle = false,
}: FormFieldProps<T>) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password" && enableVisibilityToggle;
  const effectiveType = isPassword ? (show ? "text" : "password") : type;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                type={effectiveType}
                {...field}
                className={isPassword ? "pr-10" : undefined}
              />
              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
                  aria-label={show ? "Hide password" : "Show password"}
                  tabIndex={0}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
