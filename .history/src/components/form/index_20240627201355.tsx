"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { useState } from "react";

export default function FormPage() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    workDays: "",
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
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const values = Array.from(selectedOptions, (option: any) => option.value);
      setFormData((prevData) => ({ ...prevData, [name]: values }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <div>
          <Label htmlFor="startDate">Data de início da viagem</Label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="endDate">Data de término da viagem</Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="workDays">Dias de trabalho</Label>
          <Input
            type="text"
            id="workDays"
            name="workDays"
            value={formData.workDays}
            onChange={handleChange}
            placeholder="Ex: 2023-07-02, 2023-07-03"
          />
        </div>

        <div>
          <Label htmlFor="workHours">Horários de trabalho</Label>
          <Input
            type="text"
            id="workHours"
            name="workHours"
            value={formData.workHours}
            onChange={handleChange}
            placeholder="Ex: 09:00-17:00"
          />
        </div>

        <div>
          <Label htmlFor="dayActivities">Atividades durante o dia</Label>
          <Select
            name="dayActivities"
            value={formData.dayActivities}
            onChange={handleChange}
            multiple
          >
            <SelectItem value="Exploração">Exploração</SelectItem>
            <SelectItem value="Caminhadas">Caminhadas</SelectItem>
            <SelectItem value="Passeios turísticos">Passeios turísticos</SelectItem>
          </Select>
        </div>

        <div>
          <Label htmlFor="nightActivities">Atividades durante a noite</Label>
          <Select
            id="nightActivities"
            name="nightActivities"
            value={formData.nightActivities}
            onChange={handleChange}
            multiple
          >
            <SelectItem value="Jantar">Jantar</SelectItem>
            <SelectItem value="Shows">Shows</SelectItem>
            <SelectItem value="Passeios noturnos">Passeios noturnos</SelectItem>
          </Select>
        </div>

        <div>
          <Label htmlFor="foodPreferences">Preferências alimentares</Label>
          <Select
            id="foodPreferences"
            name="foodPreferences"
            value={formData.foodPreferences}
            onChange={handleChange}
            multiple
          >
            <SelectItem value="Comida local">Comida local</SelectItem>
            <SelectItem value="Vegetariana">Vegetariana</SelectItem>
            <SelectItem value="Vegana">Vegana</SelectItem>
          </Select>
        </div>

        <div>
          <Label htmlFor="outdoorActivities">Atividades ao ar livre</Label>
          <Select
            id="outdoorActivities"
            name="outdoorActivities"
            value={formData.outdoorActivities}
            onChange={handleChange}
            multiple
          >
            <SelectItem value="Trilhas">Trilhas</SelectItem>
            <SelectItem value="Esportes aquáticos">Esportes aquáticos</SelectItem>
            <SelectItem value="Passeios na natureza">Passeios na natureza</SelectItem>
          </Select>
        </div>

        <div>
          <Label htmlFor="culturalActivities">Atividades culturais</Label>
          <Select
            id="culturalActivities"
            name="culturalActivities"
            value={formData.culturalActivities}
            onChange={handleChange}
            multiple
          >
            <SelectItem value="Museus">Museus</SelectItem>
            <SelectItem value="Galerias de arte">Galerias de arte</SelectItem>
            <SelectItem value="Teatros">Teatros</SelectItem>
          </Select>
        </div>

        <div>
          <Label htmlFor="specialDate">Data especial</Label>
          <Input
            type="date"
            id="specialDate"
            name="specialDate"
            value={formData.specialDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="specialDayActivities">Atividades especiais durante o dia</Label>
          <Select
            id="specialDayActivities"
            name="specialDayActivities"
            value={formData.specialDayActivities}
            onChange={handleChange}
            multiple
          >
            <SelectItem value="Eventos especiais">Eventos especiais</SelectItem>
            <SelectItem value="Festivais">Festivais</SelectItem>
            <SelectItem value="Experiências únicas">Experiências únicas</SelectItem>
          </Select>
        </div>

        <div>
          <Label htmlFor="specialNightActivities">Atividades especiais durante a noite</Label>
          <Select
            id="specialNightActivities"
            name="specialNightActivities"
            value={formData.specialNightActivities}
            onChange={handleChange}
            multiple
          >
            <SelectItem value="Jantar especial">Jantar especial</SelectItem>
            <SelectItem value="Eventos noturnos">Eventos noturnos</SelectItem>
            <SelectItem value="Shows exclusivos">Shows exclusivos</SelectItem>
          </Select>
        </div>

        <div>
          <Label htmlFor="travelType">Tipo de viagem</Label>
          <Select
            id="travelType"
            name="travelType"
            value={formData.travelType}
            onChange={handleChange}
          >
            <SelectItem value="Luxuosa">Luxuosa</SelectItem>
            <SelectItem value="Econômica">Econômica</SelectItem>
          </Select>
        </div>

        <div>
          <Label htmlFor="location">Local</Label>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <Button type="submit">Enviar</Button>
      </form>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dados do Formulário</DialogTitle>
          </DialogHeader>
          <pre className="whitespace-pre-wrap">{JSON.stringify(formData, null, 2)}</pre>
        </DialogContent>
      </Dialog>
    </>
  );
}