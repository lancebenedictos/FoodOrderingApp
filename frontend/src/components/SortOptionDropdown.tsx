import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};
const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },

  {
    label: "Delivery price",
    value: "deliveryPrice",
  },

  {
    label: "Delivery time",
    value: "estimatedDeliveryTime",
  },
];
const SortOptionDropdown = ({ onChange, sortOption }: Props) => {
  const selectedLabel =
    SORT_OPTIONS.find((opt) => opt.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button className="w-full" variant="outline">
          Sorted by: {selectedLabel}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {SORT_OPTIONS.map((opt) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortOptionDropdown;
