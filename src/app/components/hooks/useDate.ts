import { useEffect, useState } from "react";

type DateFormatOptions = {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "long" | "short";
};

const useDate = (dateString: string, options?: DateFormatOptions) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const date = new Date(dateString);
    const formatted = date.toLocaleString("vn-VN", options);
    setFormattedDate(formatted);
  }, [dateString, options]);

  return formattedDate;
};

export default useDate;
