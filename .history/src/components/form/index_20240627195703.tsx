// components/TravelForm.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TravelForm = () => {
  const [formData, setFormData] = useState({
    local: "",
    startDate: "",
    endDate: "",
    workDays: [],
    workHours: "",
    dayActivities: "",
    nightActivities: "",
    foodPreferences: "",
    outdoorActivities: "",
    culturalActivities: "",
    specialDate: "",
    specialDayActivities: "",
    specialNightActivities: "",
    travelType: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [jsonResult, setJsonResult] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWorkDaysChange = (dates: any) => {
    setFormData({ ...formData, workDays: dates });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setJsonResult(JSON.stringify(formData, null, 2));
    setShowModal(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-white">
        <div>
          <Label htmlFor="local">Local</Label>
          <Input type="text" name="local" id="local" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="startDate">Data de início</Label>
          <Input type="date" name="startDate" id="startDate" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="endDate">Data de término</Label>
          <Input type="date" name="endDate" id="endDate" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="workDays">Dias de trabalho</Label>
          <DatePicker
            selected={formData.workDays.length ? new Date(formData.workDays[0]) : null}
            onChange={handleWorkDaysChange}
            startDate={formData.workDays.length ? new Date(formData.workDays[0]) : undefined}
            endDate={formData.workDays.length ? new Date(formData.workDays[formData.workDays.length - 1]) : undefined}
            selectsRange
            inline
          />
        </div>
        <div>
          <Label htmlFor="workHours">Horários de trabalho</Label>
          <Input type="text" name="workHours" id="workHours" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="dayActivities">Atividades diurnas</Label>
          <Select name="dayActivities" onValueChange={(value) => handleChange({ target: { name: 'dayActivities', value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione as atividades diurnas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exploracao">Exploração</SelectItem>
              <SelectItem value="caminhadas">Caminhadas</SelectItem>
              <SelectItem value="passeios">Passeios turísticos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="nightActivities">Atividades noturnas</Label>
          <Select name="nightActivities" onValueChange={(value) => handleChange({ target: { name: 'nightActivities', value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione as atividades noturnas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jantar">Jantar</SelectItem>
              <SelectItem value="shows">Shows</SelectItem>
              <SelectItem value="passeios_noturnos">Passeios noturnos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="foodPreferences">Preferências alimentares</Label>
          <Select name="foodPreferences" onValueChange={(value) => handleChange({ target: { name: 'foodPreferences', value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione as preferências alimentares" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Comida local</SelectItem>
              <SelectItem value="vegetariana">Vegetariana</SelectItem>
              <SelectItem value="vegana">Vegana</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="outdoorActivities">Atividades ao ar livre</Label>
          <Select name="outdoorActivities" onValueChange={(value) => handleChange({ target: { name: 'outdoorActivities', value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione as atividades ao ar livre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trilhas">Trilhas</SelectItem>
              <SelectItem value="esportes_aquaticos">Esportes aquáticos</SelectItem>
              <SelectItem value="passeios_natureza">Passeios na natureza</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="culturalActivities">Atividades culturais</Label>
          <Select name="culturalActivities" onValueChange={(value) => handleChange({ target: { name: 'culturalActivities', value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione as atividades culturais" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="museus">Museus</SelectItem>
              <SelectItem value="galerias_arte">Galerias de arte</SelectItem>
              <SelectItem value="teatros">Teatros</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="specialDate">Data especial</Label>
          <Input type="date" name="specialDate" id="specialDate" onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="specialDayActivities">Atividades especiais diurnas</Label>
          <Select name="specialDayActivities" onValueChange={(value) => handleChange({ target: { name: 'specialDayActivities', value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione as atividades especiais diurnas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="evento_especial">Eventos especiais</SelectItem>
              <SelectItem value="festivais">Festivais</SelectItem>
              <SelectItem value="experiencias_unicas">Experiências únicas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="specialNightActivities">Atividades especiais noturnas</Label>
          <Select name="specialNightActivities" onValueChange={(value) => handleChange({ target: { name: 'specialNightActivities', value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione as atividades especiais noturnas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jantar_especial">Jantar especial</SelectItem>
              <SelectItem value="eventos_noturnos">Eventos noturnos</SelectItem>
              <SelectItem value="shows_exclusivos">Shows exclusivos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="travelType">Tipo de viagem</Label>
          <Select name="travelType" onValueChange={(value) => handleChange({ target: { name: 'travelType', value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de viagem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="luxo">Luxuosa</SelectItem>
              <SelectItem value="economica">Econômica</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Enviar</Button>
      </form>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Respostas do Formulário</DialogTitle>
            <DialogDescription>
              Aqui estão as respostas do formulário no formato JSON. Você pode copiá-las.
            </DialogDescription>
          </DialogHeader>
          <pre className="p-4 bg-gray-100 rounded">{jsonResult}</pre>
          <DialogFooter>
            <CopyToClipboard text={jsonResult}>
              <Button onClick={() => setShowModal(false)}>Copiar</Button>
            </CopyToClipboard>
            <Button variant="outline" onClick={() => setShowModal(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
