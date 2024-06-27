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

          <Card>
            <CardHeader>
              <CardTitle>Atividades Preferidas</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="dayActivities"
                render={() => (
                  <FormItem>
                    <FormLabel>Atividades durante o dia</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {["Exploração", "Caminhadas", "Passeios turísticos"].map((activity) => (
                        <FormField
                          key={activity}
                          control={form.control}
                          name="dayActivities"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(activity)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, activity])
                                      : field.onChange(field.value?.filter((value) => value !== activity));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">{activity}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nightActivities"
                render={() => (
                  <FormItem>
                    <FormLabel>Atividades durante a noite</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {["Jantar", "Shows", "Passeios noturnos"].map((activity) => (
                        <FormField
                          key={activity}
                          control={form.control}
                          name="nightActivities"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(activity)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, activity])
                                      : field.onChange(field.value?.filter((value) => value !== activity));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">{activity}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="foodPreferences"
                render={() => (
                  <FormItem>
                    <FormLabel>Preferências alimentares</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {["Comida local", "Vegetariana", "Vegana"].map((preference) => (
                        <FormField
                          key={preference}
                          control={form.control}
                          name="foodPreferences"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(preference)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, preference])
                                      : field.onChange(field.value?.filter((value) => value !== preference));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">{preference}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="outdoorActivities"
                render={() => (
                  <FormItem>
                    <FormLabel>Atividades ao ar livre</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {["Trilhas", "Esportes aquáticos", "Passeios na natureza"].map((activity) => (
                        <FormField
                          key={activity}
                          control={form.control}
                          name="outdoorActivities"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(activity)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, activity])
                                      : field.onChange(field.value?.filter((value) => value !== activity));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">{activity}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="culturalActivities"
                render={() => (
                  <FormItem>
                    <FormLabel>Atividades culturais</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {["Museus", "Galerias de arte", "Teatros"].map((activity) => (
                        <FormField
                          key={activity}
                          control={form.control}
                          name="culturalActivities"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(activity)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, activity])
                                      : field.onChange(field.value?.filter((value) => value !== activity));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">{activity}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atividades Especiais</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="specialDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="specialDate">Data especial</FormLabel>
                    <FormControl>
                      <Input type="date" id="specialDate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialDayActivities"
                render={() => (
                  <FormItem>
                    <FormLabel>Atividades especiais durante o dia</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {["Eventos especiais", "Festivais", "Experiências únicas"].map((activity) => (
                        <FormField
                          key={activity}
                          control={form.control}
                          name="specialDayActivities"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(activity)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, activity])
                                      : field.onChange(field.value?.filter((value) => value !== activity));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">{activity}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialNightActivities"
                render={() => (
                  <FormItem>
                    <FormLabel>Atividades especiais durante a noite</FormLabel>
                    <div className="grid grid-cols-2 gap-2">
                      {["Jantar especial", "Eventos noturnos", "Shows exclusivos"].map((activity) => (
                        <FormField
                          key={activity}
                          control={form.control}
                          name="specialNightActivities"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(activity)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, activity])
                                      : field.onChange(field.value?.filter((value) => value !== activity));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">{activity}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Viagem</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="travelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="travelType">Tipo de viagem</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value === "Luxuosa"}
                        onCheckedChange={(checked) => field.onChange(checked ? "Luxuosa" : "")}
                      />{" "}
                      Luxuosa
                      <Checkbox
                        checked={field.value === "Econômica"}
                        onCheckedChange={(checked) => field.onChange(checked ? "Econômica" : "")}
                      />{" "}
                      Econômica
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="location">Local</FormLabel>
                    <FormControl>
                      <Input type="text" id="location" {...field} />
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

