"use client";

import { useState } from "react";
import { useEffect } from "react";
import { jobK2, jobTable } from "@/service/interface";
import dayjs, { Dayjs } from "dayjs";
import ButtonK1 from "./button/ButtonK1";
import { FaPlus } from "react-icons/fa6";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatThaiDate } from "@/service/formatThaiDate";

export default function JobsPanelK2() {
  //state 0 = pending, 1 = finished, 2 = fail
  const mockdata: jobK2[] = [
    {
      id: 0,
      intersectionName: "เเยกM1",
      date: dayjs(),
      direction: "ม่งทิศเหนือ",
      subjob: [
        {
          status: 0,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 1,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 2,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 0,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
      ],
    },
    {
      id: 1,
      intersectionName: "เเยกM2",
      date: dayjs(),
      direction: "ม่งทิศเหนือ",
      subjob: [
        {
          status: 0,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 1,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 2,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 0,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
      ],
    },
  ];
  let mockrow = [];
  for (let i = 0; i < mockdata.length; i++) {
    let tempdata: jobTable = {
      id: mockdata[i].id,
      name: "งาน " + i,
      intersectionName: mockdata[i].intersectionName,
      date: formatThaiDate(mockdata[i].date),
      countingState: "Pending...",
    };
    // Logic of checking if some process failed or not, change later
    let sumState = 0;
    for (let j = 0; j < mockdata[i].subjob.length; j++) {
      sumState += mockdata[i].subjob[j].status;
    }

    if (sumState == 0) {
      tempdata.countingState = "Pending...";
    } else if (sumState == 4) {
      tempdata.countingState = "Finished";
    } else if (sumState > 4 && sumState < 8) {
      tempdata.countingState = "Some Process Failed";
    } else {
      tempdata.countingState = "All Process Failed";
    }

    mockrow.push(tempdata);
  }
  let numJobs = mockdata.length;

  const columns: GridColDef<jobTable>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Job Name",
      width: 240,
      editable: false,
    },
    {
      field: "intersectionName",
      headerName: "Intersection Name",
      width: 240,
      editable: false,
    },
    {
      field: "date",
      headerName: "Date",
      width: 240,
      editable: false,
    },
    {
      field: "countingState",
      headerName: "Counting Status",
      width: 240,
      editable: false,
    },
  ];

  const [selectedRow, setSelectedRow] = useState<jobTable | null>(null);
  useEffect(() => {
    console.log(selectedRow); // This will log the selected row whenever it's updated
    alert(selectedRow?.id);
  }, [selectedRow]);

  return (
    <div className="flex flex-col w-full bg-white">
      <div className="flex flex-row justify-between items-center px-[32px] py-[16px]">
        <div className="flex flex-row grow-0 space-x-[8px] text-amber-950">
          <h1 className="text-3xl font-bold">{"Jobs (" + numJobs + ")"}</h1>
        </div>
        <div>
          <ButtonK1
            text="Add Job"
            IconLeft={<FaPlus size={24} />}
            showIconLeft={true}
          />
        </div>
      </div>
      {/* table section */}
      <div className="flex flex-col w-[full] h-[400px]">
        <DataGrid
          rows={mockrow}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onSelectionModelChange={(newSelection) => {
            // Ensure newSelection is an array of IDs
            const selectedIDs = newSelection as number[];
            const selectedRowData = mockrow.find(
              (row) => selectedIDs.includes(row.id) // Look for the selected row by checking if the ID exists
            );
            setSelectedRow(selectedRowData || null); // Update the selectedRow state
          }}
          sx={{
            "& .MuiDataGrid-columnHeader": {
              color: "#451A03", // Change header text color
            },
            "& .MuiDataGrid-cell": {
              color: "#451A03", // Change cell text color
            },
          }}
        />
      </div>

      <div className="pt-[32px]">
        <div className="w-full flex-col flex px-[32px] py-[16px] border-t-[1px] border-amber-950">
          {selectedRow ? (
            <h1 className="text-2xl font-bold text-amber-950">
              {selectedRow.intersectionName}
            </h1>
          ) : (
            <h1 className="text-2xl font-bold text-amber-950">Select A Job</h1>
          )}
        </div>
      </div>
    </div>
  );
}
