// components/TravelForm.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { eachDayOfInterval, format, parseISO } from 'date-fns';
import { useEffect, useState } from "react";

const TravelForm = () => {
  const [formData, setFormData] = useState({
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
  const [availableDays, setAvailableDays] = useState([]);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = parseISO(formData.startDate);
      const end = parseISO(formData.endDate);
      const days = eachDayOfInterval({ start, end }).map((date) => format(date, 'yyyy-MM-dd'));
      setAvailableDays(days);
    }
  }, [formData.startDate, formData.endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWorkDaysChange = (e) => {
    const options = e.target.options;
    const selectedDays = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedDays.push(options[i].value);
      }
    }
    setFormData({ ...formData, workDays: selectedDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setJsonResult(JSON.stringify(formData, null, 2));
    setShowModal(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-white">
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
          <select
            multiple
            name="workDays"
            id="workDays"
            onChange={handleWorkDaysChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {availableDays.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
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
              <SelectItem value="economica">Econômica</>
            </SelectContent>
          </Select>
        </div></form>

    </>