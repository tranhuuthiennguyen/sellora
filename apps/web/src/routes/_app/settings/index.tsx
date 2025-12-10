import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/settings/")({
  component: RouteComponent,
});

export const LocalSetting = () => {
  const tzList = Intl.supportedValuesOf("timeZone");
  return (
    <div className="flex flex-row">
      <div className="w-sm">Local</div>
      <div className="w-max">
        <div>
          Time zone
          {tzList}
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a time zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time zone</SelectLabel>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <LocalSetting></LocalSetting>
    </div>
  );
}
