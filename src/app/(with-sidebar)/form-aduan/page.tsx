"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import axios from "@/lib/axios";
import { id } from "date-fns/locale";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/cn";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toast } from "@radix-ui/react-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
const reportFormSchema = z.object({
  name: z.string().min(1, { message: "nama wajib diisi" }),
  type: z.string().min(1, { message: "jenis wajib diisi" }),
  date: z.date({ message: "tanggal wajib diisi" }),
  phone: z.string().min(1, { message: "Nomor telepon wajib diisi" }),
  lat: z.string().min(1, { message: "Latitude wajib diisi" }),
  long: z.string().min(1, { message: "Longitude wajib diisi" }),
  location: z.string().min(1, { message: "lokasi wajib diisi" }),
  description: z.string().min(1, { message: "deskripsi wajib diisi" }),
});

type ReportFormSchemaType = z.infer<typeof reportFormSchema>;

const ReportFormPage = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>("");

  const form = useForm<ReportFormSchemaType>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: ReportFormSchemaType) => {
    try {
      const response = await axios.post("reports", values);
      toast({
        variant: "success",
        title: "Success",
        description: "Laporan berhasil diinput",
      });
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      toast({
        variant: "error",
        title: "Failed",
        description: "Laporan gagal diinput mohon cek kembali laporan anda",
      });
    }
  };

  const typeOptions = [
    "curat",
    "curanmor",
    "penganiyayaan",
    "penipuan",
    "pengeroyokan",
    "pembobolan",
  ];

  return (
    <section className="w-2/3 mx-auto pt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-5">
          <CardHeader>
            <CardTitle className="text-5xl font-bold text-center text-blue-950">
              Formulir Aduan
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-7 space-y-5 text-base">
            <div className="flex w-full gap-6 justify-between">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Nama"
                        {...field}
                        className=" px-4 py-2  w-96"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={selectedType}
                        onValueChange={(value) => {
                          setSelectedType(value);
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="w-72 capitalize">
                          <SelectValue placeholder="Jenis Kriminalitas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {typeOptions.map((option) => (
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
            </div>
            <div className="flex w-full gap-6 justify-between">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Nomor Telephone"
                        {...field}
                        className=" px-4 py-2  w-96"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-72 ">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-72  text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: id })
                            ) : (
                              <span>Tanggal Kejadian</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-72 p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: any) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between">
              <div className="w-2/3">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Lokasi Kejadian"
                          className="resize-none h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="lat"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Latitude"
                          {...field}
                          className=" px-4 py-2  w-52"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="long"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Longitude"
                          {...field}
                          className=" px-4 py-2 w-52"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsi Kejadian"
                      className="resize-none h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              className="w-40 flex gap-4 bg-blue-950 hover:bg-blue-900"
            >
              {" "}
              <Send className="mr-2 w-4 h-4" />
              Kirim
            </Button>
          </CardFooter>
        </form>
      </Form>
    </section>
  );
};

export default ReportFormPage;
