import { useFieldContext } from "@/hooks/form-context";
import { Label } from "./label";
import { Input } from "./input";
import { useState } from "react";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  const [show, setShow] = useState<boolean>(false);

  return (
    <fieldset className="flex flex-col gap-2">
      <Label>{label}</Label>
      <div className="relative">
        <Input
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          type={show ? "text" : "password"}
          className="bg-main-bg rounded-[5px] border border-gray-500"
        />
        <Button
          className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
          onClick={() => setShow(!show)}
          size="icon"
          type="button"
          variant="ghost"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
    </fieldset>
  );
}
