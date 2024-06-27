"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { eachDayOfInterval, format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const watchStartDate = watch("startDate");
  const watchEndDate = watch("endDate");

  useEffect(() => {
    if (watchStartDate && watchEndDate) {
      setTripDays(getDatesInRange(watchStartDate, watchEndDate));
    }
  }, [watchStartDate, watchEndDate]);

  const onSubmit = (data: FormData) => {
    setShowModal(true);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <div>
          <Label htmlFor="startDate">Data de início da viagem</Label>
          <Input type="date" id="startDate" {...register("startDate")} />
          {errors.startDate && <span>{errors.startDate.message}</span>}
        </div>

        <div>
          <Label htmlFor="endDate">Data de término da viagem</Label>
          <Input type="date" id="endDate" {...register("endDate")} />
          {errors.endDate && <span>{errors.endDate.message}</span>}
        </div>

        {tripDays.length > 0 && (
          <div>
            <Label>Dias de trabalho</Label>
            <div className="grid grid-cols-2 gap-2">
              {tripDays.map((day) => (
                <div key={day}>
                  <Label>
                    <Controller
                      name="workDays"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          value={day}
                          checked={field.value.includes(day)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, e.target.value]);
                            } else {
                              field.onChange(field.value.filter((val: string) => val !== e.target.value));
                            }
                          }}

                        />
                      )}
                    />
                    {day}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="workHours">Horários de trabalho</Label>
          <Input type="text" id="workHours" {...register("workHours")} placeholder="Ex: 09:00-17:00" />
          {errors.workHours && <span>{errors.workHours.message}</span>}
        </div>

        <div>
          <Label>Atividades durante o dia</Label>
          <div className="grid grid-cols-2 gap-2">
            {["Exploração", "Caminhadas", "Passeios turísticos"].map((activity) => (
              <div key={activity}>
                <Label>
                  <Controller
                    name="dayActivities"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        value={activity}
                        checked={field.value.includes(activity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, e.target.value]);
                          } else {
                            field.onChange(field.value.filter((val: string) => val !== e.target.value));
                          }
                        }}
                      />
                    )}
                  />
                  {activity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Atividades durante a noite</Label>
          <div className="grid grid-cols-2 gap-2">
            {["Jantar", "Shows", "Passeios noturnos"].map((activity) => (
              <div key={activity}>
                <Label>
                  <Controller
                    name="nightActivities"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        value={activity}
                        checked={field.value.includes(activity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, e.target.value]);
                          } else {
                            field.onChange(field.value.filter((val: string) => val !== e.target.value));
                          }
                        }}
                      />
                    )}
                  />
                  {activity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Preferências alimentares</Label>
          <div className="grid grid-cols-2 gap-2">
            {["Comida local", "Vegetariana", "Vegana"].map((preference) => (
              <div key={preference}>
                <Label>
                  <Controller
                    name="foodPreferences"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        value={preference}
                        checked={field.value.includes(preference)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, e.target.value]);
                          } else {
                            field.onChange(field.value.filter((val: string) => val !== e.target.value));
                          }
                        }}
                      />
                    )}
                  />
                  {preference}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Atividades ao ar livre</Label>
          <div className="grid grid-cols-2 gap-2">
            {["Trilhas", "Esportes aquáticos", "Passeios na natureza"].map((activity) => (
              <div key={activity}>
                <Label>
                  <Controller
                    name="outdoorActivities"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        value={activity}
                        checked={field.value.includes(activity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, e.target.value]);
                          } else {
                            field.onChange(field.value.filter((val: string) => val !== e.target.value));
                          }
                        }}
                      />
                    )}
                  />
                  {activity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Atividades culturais</Label>
          <div className="grid grid-cols-2 gap-2">
            {["Museus", "Galerias de arte", "Teatros"].map((activity) => (
              <div key={activity}>
                <Label>
                  <Controller
                    name="culturalActivities"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        value={activity}
                        checked={field.value.includes(activity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, e.target.value]);
                          } else {
                            field.onChange(field.value.filter((val: string) => val !== e.target.value));
                          }
                        }}
                      />
                    )}
                  />
                  {activity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="specialDate">Data especial</Label>
          <Input type="date" id="specialDate" {...register("specialDate")} />
        </div>

        <div>
          <Label>Atividades especiais durante o dia</Label>
          <div className="grid grid-cols-2 gap-2">
            {["Eventos especiais", "Festivais", "Experiências únicas"].map((activity) => (
              <div key={activity}>
                <Label>
                  <Controller
                    name="specialDayActivities"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        value={activity}
                        checked={field.value.includes(activity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, e.target.value]);
                          } else {
                            field.onChange(field.value.filter((val: string) => val !== e.target.value));
                          }
                        }}
                      />
                    )}
                  />
                  {activity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Atividades especiais durante a noite</Label>
          <div className="grid grid-cols-2 gap-2">
            {["Jantar especial", "Eventos noturnos", "Shows exclusivos"].map((activity) => (
              <div key={activity}>
                <Label>
                  <Controller
                    name="specialNightActivities"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        value={activity}
                        checked={field.value.includes(activity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, e.target.value]);
                          } else {
                            field.onChange(field.value.filter((val: string) => val !== e.target.value));
                          }
                        }}
                      />
                    )}
                  />
                  {activity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="travelType">Tipo de viagem</Label>
          <div className="grid grid-cols-2 gap-2">
            {["Luxuosa", "Econômica"].map((type) => (
              <div key={type}>
                <Label>
                  <Controller
                    name="travelType"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        value={type}
                        checked={field.value.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            field.onChange([...field.value, e.target.value]);
                          } else {
                            field.onChange(field.value.filter((val: string) => val !== e.target.value));
                          }
                        }}
                      />
                    )}
                  />
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="location">Local</Label>
          <Input type="text" id="location" {...register("location")} />
          {errors.location && <span>{errors.location.message}</span>}
        </div>

        <Button type="submit">Enviar</Button>
      </form>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dados do Formulário</DialogTitle>
          </DialogHeader>
          <pre className="whitespace-pre-wrap">{JSON.stringify(watch(), null, 2)}</pre>
        </DialogContent>
      </Dialog>
    </>
  )
}