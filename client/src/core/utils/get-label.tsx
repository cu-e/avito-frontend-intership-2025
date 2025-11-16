export function getLabel(sortOptions: { value: string; content: string }[], value: string) {
  return sortOptions.find((opt) => opt.value === value)?.content ?? value;
}
