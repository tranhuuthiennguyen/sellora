import { getAllTimeZones } from "@sellora/shared";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useFieldContext } from "@/hooks/form-context";

export default function TimeZoneSetting() {
  const field = useFieldContext<string>();
  const tzList = getAllTimeZones();
  return (
    <div className="w-full p-6">
      <span>Time zone</span>
      <Select
        name={field.name}
        value={field.state.value}
        onValueChange={(e) => field.handleChange(e)}
      >
        <SelectTrigger className="bg-main-bg w-full border-gray-500">
          <SelectValue placeholder="Select a time zone" />
        </SelectTrigger>
        <SelectContent className="bg-main-bg text-white border-gray-500">
          <SelectGroup>
            {tzList.map((v, i) => {
              return (
                <SelectItem key={i} value={v.region}>
                  {v.getFormattedString()}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
