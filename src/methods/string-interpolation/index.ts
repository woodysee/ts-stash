export const replacePlaceholderWithPhrasingContent = ({
  placeholder,
  replacePlaceholder,
  text,
}: {
  placeholder: string;
  replacePlaceholder: () => string;
  text: string;
}): string[] => {
  const placeholderWithSigils = `%${placeholder}%`;
  const textParts = text.split(
    new RegExp(`^(.+)?(${placeholderWithSigils})(.+)?$`, "gim"),
  );
  return textParts
    .filter((value) => value !== "" && typeof value !== "undefined")
    .map((textPart: string) => {
      if (textPart === placeholderWithSigils) {
        return replacePlaceholder();
      }
      return textPart;
    });
};
