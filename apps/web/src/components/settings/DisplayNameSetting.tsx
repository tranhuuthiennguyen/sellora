import { Label } from "../ui/label";
import { Input } from "../ui/input";

type Props = {
  name?: string;
  onChange: (username: string) => void;
};

export const DisplayNameSetting = ({ name, onChange }: Props) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="username">Name</Label>
      <Input
        type="name"
        id="name"
        placeholder="Enter your name"
        value={name}
        onChange={(v) => onChange(v.target.value)}
      />
    </div>
  );
};
