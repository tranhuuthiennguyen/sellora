import { useFormContext } from "@/hooks/form-context";

export default function SubcribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button
          disabled={isSubmitting}
          className="h-8 rounded-xs gap-1.5 px-3 has-[>svg]:px-2.5 bg-lavender-rose text-[18px] text-black font-bold shadow-lg hover:shadow-2xl transition duration-200 ease-in-out transform hover:translate-y-[-3px] hover:translate-x-[-3px]"
        >
          <span className="">{label}</span>
        </button>
      )}
    </form.Subscribe>
  );
}
