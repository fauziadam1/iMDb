import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div>
      <form
        action=""
        className="flex w-150 h-10 relative border border-gray-200 rounded-xl pr-10 overflow-auto"
      >
        <Select defaultValue="All">
          <SelectTrigger className="border-0 h-full ring-0 outline-none rounded-none">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent className="absolute top-11">
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Title">Title</SelectItem>
              <SelectItem value="Celebs">Celebs</SelectItem>
              <SelectItem value="Year">Year</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <input
          type="text"
          placeholder="Search.."
          className="border-0 border-l rounded-none pl-4 outline-none w-full h-full"
        />
        <Search className="absolute right-3 top-2 w-5 h-5" />
      </form>
    </div>
  );
}
