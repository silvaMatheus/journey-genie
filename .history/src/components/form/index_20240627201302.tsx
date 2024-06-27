"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
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
            value={formData.dayActivities.join(',')}
            onChange={handleChange}
            multiple
          >
            <option value="Exploração">Exploração</option>
            <option value="Caminhadas">Caminhadas</option>
            <option value="Passeios turísticos">Passeios turísticos</option>
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
            <option value="Jantar">Jantar</option>
            <option value="Shows">Shows</option>
            <option value="Passeios noturnos">Passeios noturnos</option>
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
            <option value="Comida local">Comida local</option>
            <option value="Vegetariana">Vegetariana</option>
            <option value="Vegana">Vegana</option>
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
            <option value="Trilhas">Trilhas</option>
            <option value="Esportes aquáticos">Esportes aquáticos</option>
            <option value="Passeios na natureza">Passeios na natureza</option>
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
            <option value="Museus">Museus</option>
            <option value="Galerias de arte">Galerias de arte</option>
            <option value="Teatros">Teatros</option>
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
            <option value="Eventos especiais">Eventos especiais</option>
            <option value="Festivais">Festivais</option>
            <option value="Experiências únicas">Experiências únicas</option>
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
            <option value="Jantar especial">Jantar especial</option>
            <option value="Eventos noturnos">Eventos noturnos</option>
            <option value="Shows exclusivos">Shows exclusivos</option>
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
            <option value="Luxuosa">Luxuosa</option>
            <option value="Econômica">Econômica</option>
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