import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function SubJobReportPage(subjobid: string) {
  let intersectionName = "แยกA";
  let direction = "มุ่งใต้";
  let date = "26/09/2567";
  let starttime = "7:00";
  let stoptime = "7:15";
  return (
    <div className="flex flex-col space-y-8 px-8 mt-16">
      <h1 className="text-3xl font-bold text-amber-950">ผลการประมวลผล</h1>
      <div className="px-4  text-amber-950 flex flex-col space-y-4">
        <h1 className="text-2xl font-semibold underline underline-offset-4 decoration-amber-950">
          ข้อมูล video
        </h1>
        <div className="flex flex-col space-y-4 text-xl font-semibold">
          <h1>ชื่อเเยก: {intersectionName}</h1>
          <h1>ทิศทาง: {direction}</h1>
          <h1>วัน/เดือน/ปี: {date}</h1>
          <h1>
            ช่วงเวลาของวิดีโอ: {starttime}
            {" - "}
            {stoptime}
          </h1>
        </div>
      </div>
    </div>
  );
}
