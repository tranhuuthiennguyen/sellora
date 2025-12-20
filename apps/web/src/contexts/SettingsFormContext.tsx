import {
  UserFieldSchemas,
  validateValue,
  type UpdateUserDto,
} from "@sellora/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { authApi } from "@/api/auth";
import { usersApi } from "@/api/users";
import { toast } from "sonner";

type SettingsFormContextType = {
  draft: UpdateUserDto | null | undefined;
  initial: UpdateUserDto | null | undefined;
  errors: Partial<Record<keyof UpdateUserDto, string>>;
  isSaving: boolean;
  error: unknown;
  updateField: <K extends keyof UpdateUserDto>(
    key: K,
    value: UpdateUserDto[K],
  ) => void;
  submit: (payload: UpdateUserDto) => void;
  reset: () => void;
  isValid: boolean;
};

const SettingsFormContext = createContext<SettingsFormContextType | null>(null);

export const useSettingsForm = () => {
  const ctx = useContext(SettingsFormContext);
  if (!ctx)
    throw new Error("useSettingsForm must be used within SettingsFormProvider");
  return ctx;
};

export const SettingsFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  if (!user) throw new Error("WHERE TF IS USER????");

  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return await authApi.me();
    },
    // enabled: !!user
  });

  const [draft, setDraft] = useState<UpdateUserDto>();
  const [initial, setInitial] = useState<UpdateUserDto>();
  const [errors, setErrors] = useState<
    Partial<Record<keyof UpdateUserDto, string>>
  >({});

  useEffect(() => {
    if (meQuery.data) {
      const base: UpdateUserDto = {
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
      setErrors({});
    }
  }, [meQuery.data]);

  const updateField = <K extends keyof UpdateUserDto>(
    key: K,
    value: UpdateUserDto[K],
  ) => {
    const schema = UserFieldSchemas[key];

    const error = schema ? validateValue(schema, value) : null;

    setErrors((prev) => ({
      ...prev,
      [key]: error ?? undefined,
    }));
    setDraft((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const isValid = useMemo(() => {
    return Object.values(errors).every((e) => !e);
  }, [errors]);

  const mutation = useMutation({
    mutationFn: async (payload: UpdateUserDto) => {
      return await usersApi.patch(user.id, payload);
    },
    onSuccess: () => {
      toast.success("User's details has been updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      setInitial(draft);
    },
  });

  const submit = (payload: UpdateUserDto) => {
    if (!draft) return;

    if (!isValid) {
      toast.error("Please fix validation errors before saving");
      return;
    }

    mutation.mutate(payload);
  };

  const reset = () => {
    setDraft(initial);
    setErrors({});
  };

  return (
    <SettingsFormContext.Provider
      value={{
        draft,
        initial,
        errors,
        isValid,
        isSaving: mutation.isPending,
        error: mutation.error,
        updateField,
        submit,
        reset,
      }}
    >
      {children}
    </SettingsFormContext.Provider>
  );
};
