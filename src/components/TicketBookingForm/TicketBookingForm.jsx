import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LocalizationProvider, DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  tickets: z.number().min(1, "At least one ticket is required"),
  date: z.date().refine((val) => val instanceof Date && !isNaN(val), "Booking date is required"),
  time: z.date().refine((val) => val instanceof Date && !isNaN(val), "Show/travel time is required"),
  payment: z.enum(["Card", "UPI", "Net Banking", "Wallet"], "Please select a payment option"),
  seat: z.enum(["Window", "Aisle", "Center"], "Please select a seat preference"),
  specialRequests: z.string().optional(),
});

const TicketBookingForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tickets: 1,
      date: dayjs().toDate(),  // Ensure initial date is valid
      time: dayjs().toDate(),  // Ensure initial time is valid
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6"
      >
        {/* Name */}
        <div>
          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-sm text-red-500 mt-1">{errors.name?.message}</p>
        </div>

        {/* Email */}
        <div>
          <input
            {...register("email")}
            placeholder="Email Address"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-sm text-red-500 mt-1">{errors.email?.message}</p>
        </div>

        {/* Phone */}
        <div>
          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-sm text-red-500 mt-1">{errors.phone?.message}</p>
        </div>

        {/* Number of Tickets */}
        <div>
          <select
            {...register("tickets")}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Ticket(s)
              </option>
            ))}
          </select>
          <p className="text-sm text-red-500 mt-1">{errors.tickets?.message}</p>
        </div>

        {/* Date Picker */}
        <div>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Date of Booking"
                value={dayjs(field.value)} // Ensure the value is always a valid Dayjs object
                onChange={(value) => field.onChange(value ? value.toDate() : null)}
                renderInput={(params) => (
                  <input
                    {...params}
                    placeholder="Select Date"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
            )}
          />
          <p className="text-sm text-red-500 mt-1">{errors.date?.message}</p>
        </div>

        {/* Time Picker */}
        <div>
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <TimePicker
                label="Time of Show/Travel"
                value={dayjs(field.value)} // Ensure the value is always a valid Dayjs object
                onChange={(value) => field.onChange(value ? value.toDate() : null)}
                renderInput={(params) => (
                  <input
                    {...params}
                    placeholder="Select Time"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                )}
              />
            )}
          />
          <p className="text-sm text-red-500 mt-1">{errors.time?.message}</p>
        </div>

        {/* Payment Options */}
        <div>
          <p className="font-medium">Payment Option:</p>
          <div className="space-y-2">
            {["Card", "UPI", "Net Banking", "Wallet"].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option}
                  {...register("payment")}
                  className="text-blue-500 focus:ring-blue-400"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <p className="text-sm text-red-500 mt-1">{errors.payment?.message}</p>
        </div>

        {/* Seat Preference */}
        <div>
          <select
            {...register("seat")}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Window">Window</option>
            <option value="Aisle">Aisle</option>
            <option value="Center">Center</option>
          </select>
          <p className="text-sm text-red-500 mt-1">{errors.seat?.message}</p>
        </div>

        {/* Special Requests */}
        <div>
          <textarea
            {...register("specialRequests")}
            placeholder="Special Requests"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Book Now
        </button>
      </form>
    </LocalizationProvider>
  );
};

export default TicketBookingForm;
