import { useState, useCallback } from "react";

const emptyForm = {
  firstName: "",
  surname: "",
  departureAirport: "",
  arrivalAirport: "",
  departureTime: "",
  arrivalTime: "",
};

function LogForm(props: {
  data: any[];
  onSubmit: (departurelog: any, arrivalLog: any) => void;
}) {
  const { onSubmit } = props;

  const [formData, setFormData] = useState(emptyForm);

  const handleSubmit = useCallback(() => {
    const passengerName = `${formData.firstName} ${formData.surname}`.trim();
    
    const departureLog = {
      passengerName,
      airport: formData.departureAirport,
      timestamp: formData.departureTime,
      type: "departure",
    };
    
    const arrivalLog = {
      passengerName,
      airport: formData.arrivalAirport,
      timestamp: formData.arrivalTime,
      type: "arrival",
    };
    
    onSubmit(departureLog, arrivalLog);
    setFormData(emptyForm);
  }, [formData, onSubmit]);

  const handleChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* First line: Name and Surname */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-semibold text-slate-700">
            Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
            placeholder="Cherprang"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="surname" className="text-sm font-semibold text-slate-700">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
            placeholder="Areekul"
          />
        </div>
      </div>

      {/* Second line: Departure, Arrival, Times */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="departureAirport" className="text-sm font-semibold text-slate-700">
            Departure
          </label>
          <input
            type="text"
            id="departureAirport"
            name="departureAirport"
            value={formData.departureAirport}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
            placeholder="Bangkok"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="arrivalAirport" className="text-sm font-semibold text-slate-700">
            Arrival
          </label>
          <input
            type="text"
            id="arrivalAirport"
            name="arrivalAirport"
            value={formData.arrivalAirport}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
            placeholder="Tokyo"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="departureTime" className="text-sm font-semibold text-slate-700">
            Departure Time
          </label>
          <input
            type="text"
            id="departureTime"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
            placeholder="1630454400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="arrivalTime" className="text-sm font-semibold text-slate-700">
            Arrival Time
          </label>
          <input
            type="text"
            id="arrivalTime"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
            placeholder="1630458000"
          />
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="w-[956px] rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
}

export default LogForm;
