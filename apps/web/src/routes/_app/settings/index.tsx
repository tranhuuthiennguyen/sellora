import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getAllTimeZones } from "@sellora/shared";

export const Route = createFileRoute("/_app/settings/")({
  component: RouteComponent,
});

type Props = {
  value?: string;
  onChange: (timeZone: string) => void;
};

export const LocalSetting = ({ value, onChange }: Props) => {
  const [parentRef, setParentRef] = useState<HTMLDivElement | null>(null);

  const tzList = getAllTimeZones();

  const rowVirtualizer = useVirtualizer({
    count: tzList.length,
    getScrollElement: () => parentRef,
    estimateSize: () => 1,
  });

  return (
    <div className="flex flex-row border-b border-gray-500">
      <div className="w-lg border-r border-gray-500 p-6">Local</div>
      <div className="w-full p-6">
        <div>Timezone</div>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="bg-[#0d0d0d] w-full">
            <SelectValue placeholder="Select a time zone" />
          </SelectTrigger>
          <SelectContent ref={setParentRef} className="bg-[#0d0d0d] text-white">
            <SelectGroup>
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                return (
                  <SelectItem
                    key={virtualRow.index}
                    value={tzList[virtualRow.index].region}
                  >
                    {tzList[virtualRow.index].getFormattedString()}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

function RouteComponent() {
  // const form = useSettingsForm()
  // if (!form?.draft) {
  //   return null
  // }

  return (
    <div className="flex flex-col">
      <LocalSetting
        // value={form.draft.timezone}
        // onChange={(v) => form?.updateField("timezone", v)}
        onChange={() => {}}
      />
    </div>
  );
}
