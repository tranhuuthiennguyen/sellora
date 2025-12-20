import SettingsNavBar from "@/components/settings/SettingsNavBar";
import { useAppForm } from "@/hooks/form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/settings/password")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useAppForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="flex justify-between border-b border-gray-500 p-6">
        <SettingsNavBar />
      </div>
      <div className="flex flex-col">
        <section className="grid grid-cols-10">
          <span className="col-span-3">
            <h1 className="p-6">Change password</h1>
          </span>
          <span className="col-span-7 grid p-6 gap-9">
            <form.AppField
              name="oldPassword"
              children={(field) => <field.PasswordField label="Old password" />}
            />
            <form.AppField
              name="newPassword"
              children={(field) => <field.PasswordField label="New password" />}
            />
          </span>
        </section>
      </div>
    </form>
  );
}
