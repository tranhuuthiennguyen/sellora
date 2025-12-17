import { authApi } from "@/api/auth";
import { usersApi } from "@/api/users";
import { useAuth } from "@/contexts/AuthContext";
import { type UpdateUserDto } from "@sellora/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

export const useSettingsForm = () => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await authApi.me();
      return res;
    },
  });

  const [draft, setDraft] = useState<UpdateUserDto>();
  const [initial, setInitial] = useState<UpdateUserDto>();

  useEffect(() => {
    if (meQuery.data) {
      const base: UpdateUserDto = {
        id: meQuery.data.user.id,
        email: meQuery.data.user.email,
        username: meQuery.data.user.username,
        displayName: meQuery.data.user.displayName,
        bio: meQuery.data.user.bio,
        currencyType: meQuery.data.user.currencyType,
        profilePictureUrl: meQuery.data.user.profilePictureUrl,
        country: meQuery.data.user.country,
        state: meQuery.data.user.state,
        city: meQuery.data.user.city,
        zipCode: meQuery.data.user.zipCode,
        streetAddress: meQuery.data.user.streetAddress,
        timezone: meQuery.data.user.timezone,
      };

      setDraft(base);
      setInitial(base);
    }
  }, [meQuery.data]);

  function updateField<K extends keyof UpdateUserDto>(
    key: K,
    value: UpdateUserDto[K],
  ) {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(draft?.timezone);
  }

  const isDirty = useMemo(() => {
    return JSON.stringify(draft) !== JSON.stringify(initial);
  }, [draft, initial]);

  const mutation = useMutation({
    mutationFn: (payload: UpdateUserDto) => usersApi.patch(user.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      setInitial(draft);
    },
  });

  return {
    draft,
    initial,
    isDirty,
    isSaving: mutation.isPending,
    error: mutation.error,
    updateField,
    submit: () => mutation.mutate(draft!),
    reset: () => setDraft(initial),
  };
};
