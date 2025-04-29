import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { singleSubjobResult } from "@/service/interface";
/* export interface singleSubjobResult {
  sjid: string;
  intersectionName: string;
  date: Dayjs;
  direction: string;
  startTime: string;
  stopTime: string;
  type1: number;
  type2: number;
  type3: number;
  type4: number;
}*/

export default function SubJobReportPage(subjobid: string) {
  let intersectionName = "แยกA";
  let direction = "มุ่งใต้";
  let date = "26/09/2567";
  let starttime = "7:00";
  let stoptime = "7:15";

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ) {
    return { name, calories, fat, carbs, protein };
  }

  let createSingleSubjubDetail = (
    sjid: string,
    type1: number,
    type2: number,
    type3: number,
    type4: number
  ) => ({
    sjid,
    type1,
    type2,
    type3,
    type4,
  });

  const rows = [createSingleSubjubDetail("a", 1, 2, 2, 50)];

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
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Vehicle type 1</TableCell>
                <TableCell align="right">Vehicle type 2</TableCell>
                <TableCell align="right">Vehicle type 3</TableCell>
                <TableCell align="right">Vehicle type 4</TableCell>
                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.sjid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell component="th" scope="row">
                    {row.sjid}
                  </TableCell> */}
                  <TableCell align="right">{row.type1}</TableCell>
                  <TableCell align="right">{row.type2}</TableCell>
                  <TableCell align="right">{row.type3}</TableCell>
                  <TableCell align="right">{row.type4}</TableCell>
                  {/* <TableCell align="right">{row.type1}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
