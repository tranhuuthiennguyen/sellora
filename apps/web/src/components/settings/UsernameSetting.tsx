import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

type Props = {
  username?: string;
  onChange: (username: string) => void;
};

export const UsernameSetting = ({ username, onChange }: Props) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => setValue(username ? username : ""), [username]);

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="username">Username</Label>
      <Input
        type="username"
        id="username"
        placeholder="Username"
        value={value}
        required={true}
        onChange={(v) => onChange(v.target.value)}
      />
    </div>
  );
};
