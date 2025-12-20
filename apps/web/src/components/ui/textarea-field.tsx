import { useFieldContext } from "@/hooks/form-context";
import { Label } from "./label";
import { Textarea } from "./textarea";

export default function TextAreaField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  return (
    <fieldset className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Textarea
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        className="bg-main-bg rounded-[5px] border border-gray-500"
      />
    </fieldset>
  );
}
