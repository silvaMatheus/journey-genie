// components/TravelForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const TravelForm = () => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    workDays: "",
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
        <Input type="text" name="workDays" id="workDays" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="workHours">Horários de trabalho</Label>
        <Input type="text" name="workHours" id="workHours" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="dayActivities">Atividades diurnas</Label>
        <Textarea name="dayActivities" id="dayActivities" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="nightActivities">Atividades noturnas</Label>
        <Textarea name="nightActivities" id="nightActivities" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="foodPreferences">Preferências alimentares</Label>
        <Textarea name="foodPreferences" id="foodPreferences" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="outdoorActivities">Atividades ao ar livre</Label>
        <Textarea name="outdoorActivities" id="outdoorActivities" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="culturalActivities">Atividades culturais</Label>
        <Textarea name="culturalActivities" id="culturalActivities" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="specialDate">Data especial</Label>
        <Input type="date" name="specialDate" id="specialDate" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="specialDayActivities">Atividades especiais diurnas</Label>
        <Textarea name="specialDayActivities" id="specialDayActivities" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="specialNightActivities">Atividades especiais noturnas</Label>
        <Textarea name="specialNightActivities" id="specialNightActivities" onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="travelType">Tipo de viagem</Label>
        <Select name="travelType" id="travelType" onValueChange={(value) => handleChange({ target: { name: 'travelType', value } })}>
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
  );
};

export default TravelForm;