export function formatName(fileName: string): string {
  const parts = fileName.split(/[.-]/);

  const formattedParts = parts.map((part, index) =>
    index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1),
  );

  return formattedParts.join("");
}
