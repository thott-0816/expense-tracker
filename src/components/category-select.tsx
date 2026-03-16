import type { CategoryRecord } from "@/types/expense";

type CategorySelectProps = {
  categories: CategoryRecord[];
  id?: string;
  value: string;
  onChange: (value: string) => void;
};

export function CategorySelect({ categories, id, value, onChange }: CategorySelectProps) {
  return (
    <select
      className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm"
      id={id}
      name="categoryId"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">Chọn danh mục</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
