"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  startDate: z.string().nonempty("Data de início é obrigatória"),
  endDate: z.string().nonempty("Data de término é obrigatória"),
  workDays: z.string().nonempty("Dias de trabalho são obrigatórios"),
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

export default function FormPage() {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

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

        <div>
          <Label htmlFor="workDays">Dias de trabalho</Label>
          <Input type="text" id="workDays" {...register("workDays")} placeholder="Ex: 2023-07-02, 2023-07-03" />
          {errors.workDays && <span>{errors.workDays.message}</span>}
        </div>

        <div>
          <Label htmlFor="workHours">Horários de trabalho</Label>
          <Input type="text" id="workHours" {...register("workHours")} placeholder="Ex: 09:00-17:00" />
          {errors.workHours && <span>{errors.workHours.message}</span>}
        </div>

        <div>
          <Label htmlFor="dayActivities">Atividades durante o dia</Label>
          <select id="dayActivities" {...register("dayActivities")} multiple>
            <option value="Exploração">Exploração</option>
            <option value="Caminhadas">Caminhadas</option>
            <option value="Passeios turísticos">Passeios turísticos</option>
          </select>
          {errors.dayActivities && <span>{errors.dayActivities.message}</span>}
        </div>

        <div>
          <Label htmlFor="nightActivities">Atividades durante a noite</Label>
          <select id="nightActivities" {...register("nightActivities")} multiple>
            <option value="Jantar">Jantar</option>
            <option value="Shows">Shows</option>
            <option value="Passeios noturnos">Passeios noturnos</option>
          </select>
          {errors.nightActivities && <span>{errors.nightActivities.message}</span>}
        </div>

        <div>
          <Label htmlFor="foodPreferences">Preferências alimentares</Label>
          <select id="foodPreferences" {...register("foodPreferences")} multiple>
            <option value="Comida local">Comida local</option>
            <option value="Vegetariana">Vegetariana</option>
            <option value="Vegana">Vegana</option>
          </select>
          {errors.foodPreferences && <span>{errors.foodPreferences.message}</span>}
        </div>

        <div>
          <Label htmlFor="outdoorActivities">Atividades ao ar livre</Label>
          <select id="outdoorActivities" {...register("outdoorActivities")} multiple>
            <option value="Trilhas">Trilhas</option>
            <option value="Esportes aquáticos">Esportes aquáticos</option>
            <option value="Passeios na natureza">Passeios na natureza</option>
          </select>
          {errors.outdoorActivities && <span>{errors.outdoorActivities.message}</span>}
        </div>

        <div>
          <Label htmlFor="culturalActivities">Atividades culturais</Label>
          <select id="culturalActivities" {...register("culturalActivities")} multiple>
            <option value="Museus">Museus</option>
            <option value="Galerias de arte">Galerias de arte</option>
            <option value="Teatros">Teatros</option>
          </select>
          {errors.culturalActivities && <span>{errors.culturalActivities.message}</span>}
        </div>

        <div>
          <Label htmlFor="specialDate">Data especial</Label>
          <Input type="date" id="specialDate" {...register("specialDate")} />
        </div>

        <div>
          <Label htmlFor="specialDayActivities">Atividades especiais durante o dia</Label>
          <select id="specialDayActivities" {...register("specialDayActivities")} multiple>
            <option value="Eventos especiais">Eventos especiais</option>
            <option value="Festivais">Festivais</option>
            <option value="Experiências únicas">Experiências únicas</option>
          </select>
          {errors.specialDayActivities && <span>{errors.specialDayActivities.message}</span>}
        </div>

        <div>
          <Label htmlFor="specialNightActivities">Atividades especiais durante a noite</Label>
          <select id="specialNightActivities" {...register("specialNightActivities")} multiple>
            <option value="Jantar especial">Jantar especial</option>
            <option value="Eventos noturnos">Eventos noturnos</option>
            <option value="Shows exclusivos">Shows exclusivos</option>
          </select>
          {errors.specialNightActivities && <span>{errors.specialNightActivities.message}</span>}
        </div>

        <div>
          <Label htmlFor="travelType">Tipo de viagem</Label>
          <select id="travelType" {...register("travelType")}>
            <option value="Luxuosa">Luxuosa</option>
            <option value="Econômica">Econômica</option>
          </select>
          {errors.travelType && <span>{errors.travelType.message}</span>}
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
          {/* <pre className="whitespace-pre-wrap">{JSON.stringify(formState, null, 2)}</pre> */}
        </DialogContent>
      </Dialog>
    </>
  );
}