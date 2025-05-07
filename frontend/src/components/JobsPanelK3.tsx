/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { jobK2, jobTable } from "@/service/interface";
import dayjs, { Dayjs } from "dayjs";
import ButtonK1 from "./button/ButtonK1";
import { FaPlus } from "react-icons/fa6";

import SingleSubJobK1Q1 from "./SingleSubJobK1Q1";
import { Table, Button } from "antd";
import { useRouter } from "next/navigation";

import { MdOutlineFileDownload } from "react-icons/md";
import useJobsProcessingDataStore from "@/stores/processsing-jobs/processing-jobs";
import * as XLSX from 'xlsx';
import axios from "axios";

export default function JobsPanelK3() {
  //state 0 = pending, 1 = finished, 2 = fail
  const { data: jobsProcessingData, setJobsProcessingData } =
    useJobsProcessingDataStore();
  const router = useRouter();
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
    {
      id: 2,
      intersectionName: "เเยกM3",
      date: dayjs(),
      direction: "ม่งทิศเหนือ",
      subjob: [
        {
          status: 1,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 1,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 1,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
        {
          status: 1,
          resultUrl: "",
          videoUrl: "/img/traffic.jpg",
        },
      ],
    },
  ];



  const [selectedItem, setSelectedItem] = useState<jobTable | null>(null);
  const [jobsData, setJobsData] = useState<Job[]>([]);

  const getJob = async () => {
    const jobres = await axios.get<JobResponse>("http://localhost:1337/api/jobs/summary");
    console.log(jobres)
    setJobsData(jobres.data.data)
  }
  
  useEffect(() => {
      getJob()
  }, [])



const Download = async (job: any) => {
  try {
    const res = await axios.get(`http://localhost:1337/api/tasks`, {
      params: {
        filters: { job: job.id },
      },
    });

    const tasks = res.data.data.map((item: any) => ({
      id: item.id,
      ...item,
    }));

    const sheetNames = new Set<string>();
    tasks.forEach((task:any) => {
      if (task.result) {
        Object.keys(task.result).forEach((key) => {
            sheetNames.add(key);
        });
      }
    });
    const sheets: { [sheetName: string]: any[][] } = {};

    sheetNames.forEach((line) => {
      const sheetData: any[][] = [];
      sheetData.push(['ช่วงเวลา', 'Car', 'Truck', 'Bus', 'Motorcycle']);

      tasks.forEach((task: any, index: string | number) => {
        const lineResult = task.result?.[line] || {};
        const timeRange = `${job.time?.[index]?.startTime ?? '-'} - ${job.time?.[index]?.endTime ?? '-'}`;

        sheetData.push([
          timeRange,
          lineResult.car ?? 0,
          lineResult.truck ?? 0,
          lineResult.bus ?? 0,
          lineResult.motorcycle ?? 0,
        ]);
      });

      sheets[line] = sheetData;
    });

    const workbook = XLSX.utils.book_new();
    for (const sheetName in sheets) {
      const ws = XLSX.utils.aoa_to_sheet(sheets[sheetName]);
      XLSX.utils.book_append_sheet(workbook, ws, sheetName);
    }

    XLSX.writeFile(
      workbook,
      `job_${job.intersectionName?.replace(/\s+/g, '_') || 'unknown'}_${job.date || 'no_date'}.xlsx`
    );    
  } catch (err) {
    console.error('Error exporting Excel:', err);
  }
};

  

  const data = jobsData.map((item, index) => {
    return {
      id: item.id,
      name: "งาน " + index,
      intersectionName: item.intersectionName as string,
      date: item.date as string,
      direction: item.direction as string,
      countingState: item.countingStatus,
      time: item.video
    };
  });

  // const Download = 
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Intersection Name",
      dataIndex: "intersectionName",
      key: "intersectionName",
    },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "countingStatus",
      dataIndex: "countingState",
      key: "countingState",
    },
    {
      title: "Action",
      render: (_: unknown, record: jobTable) => (
        <div className="flex flex-row space-x-[24px]">
          <Button onClick={() => Download(record)}>Download CSV</Button>
          <Button
            onClick={() =>
              setJobsProcessingData(
                jobsProcessingData.filter((item, index) => index !== record.id)
              )
            }
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      <div className="flex flex-row justify-between items-center px-[32px] py-[16px]">
        <div className="flex flex-row grow-0 space-x-[8px] text-amber-950">
          <h1 className="text-3xl font-bold">
            {"Jobs (" + data.length + ")"}
          </h1>
        </div>
        <div>
          <ButtonK1
            text="Add Job"
            IconLeft={<FaPlus size={24} />}
            showIconLeft={true}
            onClick={() => {
              router.push("/newjob/step1");
            }}
          />
        </div>
      </div>
      {/* table section */}
      <div className="flex-grow">
        <Table
          dataSource={data}
          columns={columns}
          className="border border-gray-300 priority"
          rowClassName={() => "hover:bg-orange-50 bg-yellow-100"}
        />
      </div>

      {/* <div className="pt-[32px]">
        <div className="w-full flex-col flex px-[32px] py-[16px] border-t-[1px] border-amber-950">
          {selectedItem ? (
            <div className="flex flex-col space-y-[24px] text-amber-950">
              <div>
                <h1 className="text-3xl font-bold"> {selectedItem.name}</h1>
              </div>
              <div className="flex flex-col space-y-[24px] px-[64px]">
                <h1 className="text-xl font-bold"> Detail</h1>
                <table className=" text-amber-950  text-xl ">
                  <tbody>
                    <tr>
                      <th className="w-1/5 text-left font-bold">ชื่อเเยก:</th>
                      <td className="font-normal">
                        {selectedItem.intersectionName}
                      </td>
                    </tr>
                    <tr>
                      <th className="w-1/5 text-left font-bold">
                        วัน/เดือน/ปี:
                      </th>
                      <td className="font-normal">{selectedItem.date}</td>
                    </tr>
                    <tr>
                      <th className="w-1/5 text-left font-bold">ทิศทาง:</th>
                      <td className="font-normal">{selectedItem.direction}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col space-y-[24px] px-[64px]">
                <div>
                  <h1 className="text-2xl font-bold"> Counting Processed</h1>
                </div>
                {mockdata[selectedItem.id].subjob.map((item, index) => (
                  <div key={index}>
                    <SingleSubJobK1Q1
                      status={item.status}
                      imageUrl="/img/traffic.jpg"
                    />
                  </div>
                ))}
              </div>
              <ButtonK1
                text="Download ผลลัพท์ทั้งหมด เป็น .csv ไฟล์เดียว"
                showIconLeft={true}
                IconLeft={<MdOutlineFileDownload size={32} />}
              />
            </div>
          ) : (
            <h1 className="text-2xl font-bold text-amber-950">Select A Job</h1>
          )}
        </div>
      </div> */}
    </div>
  );
}



interface JobVideo {
  startTime: string;
  endTime: string;
}

interface Job {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  intersectionName: string | null;
  date: string | null;
  direction: string | null;
  video: JobVideo[] | null;
  countingStatus: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Meta {
  pagination: Pagination;
}

interface JobResponse {
  data: Job[];
  meta: Meta;
}
