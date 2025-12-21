import { meQuery } from "@/api/auth/queries";
import { usersApi } from "@/api/users";
import SettingsNavBar from "@/components/settings/SettingsNavBar";
import { useAuth } from "@/contexts/AuthContext";
import { useAppForm } from "@/hooks/form";
import type { UpdateUserDto } from "@sellora/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings/profile")({
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
      username: data?.user.username ?? "",
      displayName: data?.user.displayName ?? "",
      bio: data?.user.bio ?? "",
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
      <div className="grid grid-cols-12">
        <section className="col-span-8 border-b border-gray-500">
          <header className="px-6 pt-6">
            <h2>Profile</h2>
          </header>
          <div className="flex flex-col p-6 gap-7">
            <form.AppField
              name="username"
              children={(field) => <field.TextField label="Username" />}
            />
            <form.AppField
              name="displayName"
              children={(field) => <field.TextField label="Name" />}
            />
            <form.AppField
              name="bio"
              children={(field) => <field.TextAreaField label="Bio" />}
            />
          </div>
        </section>
        <section className="col-span-4 bg-main-bg"></section>
      </div>
    </form>
  );
}
