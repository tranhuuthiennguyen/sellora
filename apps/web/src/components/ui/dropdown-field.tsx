import { useFieldContext } from "@/hooks/form-context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { CURRENCIES } from "@sellora/shared";

export default function DropDownField() {
  const field = useFieldContext<string>();
  return (
    <div className="w-full p-6">
      <span>Sell in...</span>
      <Select
        name={field.name}
        value={field.state.value}
        onValueChange={(e) => field.handleChange(e)}
      >
        <SelectTrigger className="bg-main-bg w-full">
          <SelectValue placeholder="Select your currency" />
        </SelectTrigger>
        <SelectContent className="bg-main-bg text-white">
          <SelectGroup>
            {CURRENCIES.map((v, i) => {
              return (
                <SelectItem key={i} value={v.code}>
                  {v.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
