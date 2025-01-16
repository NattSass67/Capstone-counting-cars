import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/th"; // Import Thai locale

// Function to format a Dayjs object into "DD-MM-YYYY" with Thai month
export function formatThaiDate(input: Dayjs): string {
  dayjs.locale("th"); // Set locale to Thai
  return input.format("DD MMMM YYYY"); // Format with Thai month names
}
