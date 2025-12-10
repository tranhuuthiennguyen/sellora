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

export const getUTCOffset = (timeZone: string, date = new Date()) => {
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timeZone }));

  const offsetMs = tzDate.getTime() - utcDate.getTime();

  return offsetMs / 3600000;
};

export interface RawTimeZone {
  region: string;
  offset: number;
}

export class TimeZone implements RawTimeZone {
  region: string;
  offset: number;

  public constructor(region: string, offset: number) {
    this.region = region;
    this.offset = offset;
  }

  public getString() {
    const a = this.region.split("/");
    return a
      .map((v) => {
        return v ? v.split("_").join(" ") : null;
      })
      .join("/");
  }
}

export const filterTimeZone = (tzList: TimeZone[]) => {
  const unique = tzList.filter(
    (tz, index, self) =>
      index === self.findIndex((t) => t.region === tz.region),
  );
  const filtered = unique.filter((v) => {
    return !v.region.startsWith("Etc");
  });
  filtered.sort((a, b) => {
    if (a.offset > b.offset) return 1;
    if (a.offset < b.offset) return -1;
    return 0;
  });

  return filtered;
};

export const LocalSetting = () => {
  const tzList = Intl.supportedValuesOf("timeZone");
  console.log(tzList);
  let tzWithOffsetList: TimeZone[] = [];

  for (const tz of tzList) {
    const offset = getUTCOffset(tz);
    tzWithOffsetList.push(new TimeZone(tz, offset));
  }

  tzWithOffsetList = filterTimeZone(tzWithOffsetList);
  return (
    <div className="flex flex-row">
      <div className="w-sm">Local</div>
      <div className="w-max">
        <div>
          Time zone
          {tzWithOffsetList.map((tz, idx) => {
            return (
              <li key={idx}>
                {tz.offset} | {tz.getString()}
              </li>
            );
          })}
          {/* {tzList[0]} */}
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
