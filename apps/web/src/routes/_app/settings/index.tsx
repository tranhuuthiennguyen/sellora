import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppForm } from "@/hooks/form";
import SettingsNavBar from "@/components/settings/SettingsNavBar";
import { usersApi } from "@/api/users";
import type { UpdateUserDto } from "@sellora/shared";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { meQuery } from "@/api/auth/queries";

export const Route = createFileRoute("/_app/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data } = useQuery(meQuery());

  const { user } = useAuth();
  if (!user) throw new Error("WHERE TF IS USER????");

  const mutation = useMutation({
    mutationFn: async (payload: UpdateUserDto) => {
      return await usersApi.patch(user.id, payload);
    },
    onSuccess: () => {
      toast.success("User's details has been updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const form = useAppForm({
    defaultValues: {
      timezone: data?.user.timezone ?? "",
      currencyType: data?.user.currencyType ?? "",
    },
    onSubmit: ({ value }) => {
      mutation.mutate(value);
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
        <form.AppForm>
          <form.SubcribeButton label="Update settings" />
        </form.AppForm>
      </div>
      <div className="flex flex-col">
        <section className="grid grid-cols-10 border-b border-gray-500">
          <span className="col-span-3 border-r border-gray-500">
            <h1 className="p-6">Local</h1>
          </span>
          <span className="col-span-7">
            <form.AppField
              name="timezone"
              children={(field) => <field.TimeZoneSettingField />}
            />
            <form.AppField
              name="currencyType"
              children={(field) => <field.CurrencySettingField />}
            />
          </span>
        </section>
      </div>
    </form>
  );
}
