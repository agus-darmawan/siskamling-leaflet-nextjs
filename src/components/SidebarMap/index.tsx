"use client";

import { Checkbox } from "@/components/ui/checkbox";

const typeOptions = [
  "curat",
  "curanmor",
  "penganiayaan",
  "penipuan",
  "pengeroyokan",
  "pembobolan",
  "lainnya",
];

interface SidebarMapProps {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export function SidebarMap({
  selectedItems,
  setSelectedItems,
}: SidebarMapProps) {
  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  return (
    <div className="flex absolute left-64">
      <aside className="w-64 p-4 bg-gray-100">
        <div className="mb-4">
          <label className="font-semibold text-lg">Jenis Kriminalitas</label>
        </div>
        <div className="space-y-4">
          {typeOptions.map((type) => (
            <div
              key={type}
              className="flex flex-row items-start space-x-3 space-y-0"
            >
              <Checkbox
                checked={selectedItems.includes(type)}
                onCheckedChange={(checked: any) =>
                  handleCheckboxChange(type, checked)
                }
              />
              <label className="text-sm font-normal">{type}</label>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
