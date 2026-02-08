import { authApi } from "@/api/auth";
import { meQuery } from "@/api/auth/queries";
import SettingsNavBar from "@/components/settings/SettingsNavBar";
import { useAuth } from "@/contexts/AuthContext";
import { useAppForm } from "@/hooks/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings/password")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();
  const { data } = useQuery(meQuery(accessToken));

  const user = data.data.me;
  const mutation = useMutation({
    mutationKey: ["password", "update"],
    mutationFn: async ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    }) => {
      const res = await authApi.changePassword(
        user.email,
        oldPassword,
        newPassword,
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["password", "update"] });
      toast.info("Password updated!");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  const form = useAppForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    onSubmit: async ({ value }) => {
      await mutation.mutate(value);
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
            <form.AppForm>
              <form.SubcribeButton label="Change password" />
            </form.AppForm>
          </span>
        </section>
      </div>
    </form>
  );
}
