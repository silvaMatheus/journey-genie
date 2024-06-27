// components/TravelForm.tsx
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
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Data de início</label>
        <input type="date" name="startDate" id="startDate" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Data de término</label>
        <input type="date" name="endDate" id="endDate" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="workDays" className="block text-sm font-medium text-gray-700">Dias de trabalho</label>
        <input type="text" name="workDays" id="workDays" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="workHours" className="block text-sm font-medium text-gray-700">Horários de trabalho</label>
        <input type="text" name="workHours" id="workHours" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="dayActivities" className="block text-sm font-medium text-gray-700">Atividades diurnas</label>
        <textarea name="dayActivities" id="dayActivities" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="nightActivities" className="block text-sm font-medium text-gray-700">Atividades noturnas</label>
        <textarea name="nightActivities" id="nightActivities" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="foodPreferences" className="block text-sm font-medium text-gray-700">Preferências alimentares</label>
        <textarea name="foodPreferences" id="foodPreferences" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="outdoorActivities" className="block text-sm font-medium text-gray-700">Atividades ao ar livre</label>
        <textarea name="outdoorActivities" id="outdoorActivities" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="culturalActivities" className="block text-sm font-medium text-gray-700">Atividades culturais</label>
        <textarea name="culturalActivities" id="culturalActivities" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="specialDate" className="block text-sm font-medium text-gray-700">Data especial</label>
        <input type="date" name="specialDate" id="specialDate" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="specialDayActivities" className="block text-sm font-medium text-gray-700">Atividades especiais diurnas</label>
        <textarea name="specialDayActivities" id="specialDayActivities" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="specialNightActivities" className="block text-sm font-medium text-gray-700">Atividades especiais noturnas</label>
        <textarea name="specialNightActivities" id="specialNightActivities" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label htmlFor="travelType" className="block text-sm font-medium text-gray-700">Tipo de viagem</label>
        <select name="travelType" id="travelType" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="luxo">Luxuosa</option>
          <option value="economica">Econômica</option>
        </select>
      </div>
      <button type="submit" className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Enviar</button>
    </form>
  );
};

export default TravelForm;