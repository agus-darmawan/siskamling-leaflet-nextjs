"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Edit } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "@/lib/axios";

const statusFormSchema = z.object({
  status: z.string().min(1, { message: "name is required" }),
});

type StatusFormSchemaType = z.infer<typeof statusFormSchema>;

interface StatusUpdateFormProps {
  modalClose: () => void;
  data: any;
}

const StatusUpdateForm: React.FC<StatusUpdateFormProps> = ({
  modalClose,
  data,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(data.status);
  const { toast } = useToast();
  const form = useForm<StatusFormSchemaType>({
    resolver: zodResolver(statusFormSchema),
    defaultValues: {
      status: data.status,
    },
  });

  const onSubmit = async (values: StatusFormSchemaType) => {
    try {
      await axios.patch(`/reports/${data.id}`, values);
      toast({
        title: "Success",
        description: "Status berhasil diubah",
      });
    } catch (error) {
      if (error) {
        toast({
          title: "Failed",
          description: "Status gagal diubah",
        });
      }
    }
  };

  const statusOptions = ["tertangani", "belum tertangani", "dalam penanganan"];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Update Status</CardTitle>
          <CardDescription>Update status data</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={selectedStatus}
                    onValueChange={(value) => {
                      setSelectedStatus(value);
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="max-w-72 capitalize">
                      <SelectValue placeholder="Jenis Kriminalitas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {statusOptions.map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                            className="capitalize"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">
            {" "}
            <Edit className="mr-2 h-4 w-4" />
            Update
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default StatusUpdateForm;
