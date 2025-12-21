// src/hooks/form.ts
import { lazy } from "react";
import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "./form-context.tsx";

const TextField = lazy(() => import("../components/ui/text-field.tsx"));
const TextFieldRequired = lazy(
  () => import("../components/ui/text-field-required.tsx"),
);
const TextAreaField = lazy(() => import("../components/ui/textarea-field.tsx"));
const PasswordField = lazy(() => import("../components/ui/password-field.tsx"));
const SubcribeButton = lazy(
  () => import("../components/ui/subcribe-button.tsx"),
);
const SubmitButton = lazy(() => import("../components/ui/submit-button.tsx"));
const CurrencySettingField = lazy(
  () => import("../components/settings/CurrencySetting.tsx"),
);
const TimeZoneSettingField = lazy(
  () => import("../components/settings/TimeZoneSetting.tsx"),
);

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextFieldRequired,
    TextAreaField,
    PasswordField,
    CurrencySettingField,
    TimeZoneSettingField,
  },
  formComponents: {
    SubcribeButton,
    SubmitButton,
  },
});
