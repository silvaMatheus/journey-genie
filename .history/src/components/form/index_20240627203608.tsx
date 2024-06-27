"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { eachDayOfInterval, format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  startDate: z.string().nonempty("Data de início é obrigatória"),
  endDate: z.string().nonempty("Data de término é obrigatória"),
  workDays: z.array(z.string()),
  workHours: z.string().nonempty("Horários de trabalho são obrigatórios"),
  dayActivities: z.array(z.string()),
  nightActivities: z.array(z.string()),
  foodPreferences: z.array(z.string()),
  outdoorActivities: z.array(z.string()),
  culturalActivities: z.array(z.string()),
  specialDate: z.string().optional(),
  specialDayActivities: z.array(z.string()),
  specialNightActivities: z.array(z.string()),
  travelType: z.string().nonempty("Tipo de viagem é obrigatório"),
  location: z.string().nonempty("Local é obrigatório"),
});

type FormData = z.infer<typeof formSchema>;

const getDatesInRange = (start: string, end: string) => {
  const startDate = parseISO(start);
  const endDate = parseISO(end);
  return eachDayOfInterval({ start: startDate, end: endDate }).map((date) =>
    format(date, "yyyy-MM-dd")
  );
};

export default function FormPage() {
  const [showModal, setShowModal] = useState(false);
  const [tripDays, setTripDays] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      workDays: [],
      workHours: "",
      dayActivities: [],
      nightActivities: [],
      foodPreferences: [],
      outdoorActivities: [],
      culturalActivities: [],
      specialDate: "",
      specialDayActivities: [],
      specialNightActivities: [],
      travelType: "",
      location: "",
    },
  });

  const watchStartDate = form.watch("startDate");
  const watchEndDate = form.watch("endDate");

  useEffect(() => {
    if (watchStartDate && watchEndDate) {
      setTripDays(getDatesInRange(watchStartDate, watchEndDate));
    }
  }, [watchStartDate, watchEndDate]);

  const onSubmit = (data: FormData) => {
    setShowModal(true);
    console.log(data);
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Viagem</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="startDate">Data de início da viagem</FormLabel>
                    <FormControl>
                      <Input type="date" id="startDate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="endDate">Data de término da viagem</FormLabel>
                    <FormControl>
                      <Input type="date" id="endDate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {tripDays.length > 0 && (
                <FormField
                  control={form.control}
                  name="workDays"
                  render={() => (
                    <FormItem>
                      <FormLabel>Dias de trabalho</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {tripDays.map((day) => (
                          <FormField
                            key={day}
                            control={form.control}
                            name="workDays"
                            render={({ field }) => (
                              <FormItem key={day} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(day)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, day])
                                        : field.onChange(field.value?.filter((value) => value !== day));
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">{day}</FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="workHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="workHours">Horários de trabalho</FormLabel>
                    <FormControl>
                      <Input type="text" id="workHours" placeholder="Ex: 09:00-17:00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>



          <Button type="submit">Enviar</Button>

        </form>
      </FormProvider>


      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dados do Formulário</DialogTitle>
          </DialogHeader>
          <pre className="whitespace-pre-wrap">{JSON.stringify(form.getValues(), null, 2)}</pre>
        </DialogContent>
      </Dialog>
    </>
  );
}

