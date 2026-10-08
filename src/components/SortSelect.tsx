"use client";

import { Label, ListBox, Select } from "@heroui/react";
import type { SortKey } from "@/types/product";

const OPTIONS: { id: SortKey; label: string }[] = [
  { id: "default", label: "ডিফল্ট" },
  { id: "price-asc", label: "দাম: কম থেকে বেশি" },
  { id: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export function SortSelect({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
}) {
  return (
    <Select
      className="min-w-[220px]"
      selectedKey={value}
      onSelectionChange={(key) => {
        if (key) onChange(String(key) as SortKey);
      }}
    >
      <Label>সাজান</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {OPTIONS.map((option) => (
            <ListBox.Item key={option.id} id={option.id} textValue={option.label}>
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
