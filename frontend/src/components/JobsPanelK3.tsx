"use client";

import { useState } from "react";
import { jobK2, jobTable } from "@/service/interface";
import dayjs, { Dayjs } from "dayjs";
import ButtonK1 from "./button/ButtonK1";
import { FaPlus } from "react-icons/fa6";
import { formatThaiDate } from "@/service/formatThaiDate";
import SingleSubJobK1Q1 from "./SingleSubJobK1Q1";
import { Table, Button } from "antd";
import { useRouter } from "next/navigation";

import { MdOutlineFileDownload } from "react-icons/md";

export default function JobsPanelK3() {
  //state 0 = pending, 1 = finished, 2 = fail
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
    let count0 = 0;
    let count1 = 0;
    let count2 = 0;
    for (let j = 0; j < mockdata[i].subjob.length; j++) {
      // sumState += mockdata[i].subjob[j].status;
      if (mockdata[i].subjob[j].status == 0) {
        count0++;
      } else if (mockdata[i].subjob[j].status == 1) {
        count1++;
      } else if (mockdata[i].subjob[j].status == 2) {
        count2++;
      }
    }
    if (count0 == 4) {
      tempdata.countingState = "Pending...";
    } else if (count1 == 4) {
      tempdata.countingState = "Finished";
    } else if (count2 == 4) {
      tempdata.countingState = "All Process Failed";
    } else {
      tempdata.countingState = "Some Process Failed";
    }
    mockrow.push(tempdata);
  }
  let numJobs = mockdata.length;

  const [selectedItem, setSelectedItem] = useState<jobTable | null>(null);

  let data = mockrow;

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
      title: "View Details",
      render: (_: unknown, record: jobTable) => (
        <Button onClick={() => setSelectedItem(record)}>View Details</Button>
      ),
    },
  ];

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
          rowClassName={() => "hover:bg-orange-50"}
        />
      </div>

      <div className="pt-[32px]">
        <div className="w-full flex-col flex px-[32px] py-[16px] border-t-[1px] border-amber-950">
          {selectedItem ? (
            <div className="flex flex-col space-y-[24px] text-amber-950">
              <div>
                <h1 className="text-3xl font-bold"> {selectedItem.name}</h1>
              </div>
              <div className="flex flex-col space-y-[24px] px-[64px]">
                <h1 className="text-2xl font-bold"> Detail</h1>
                <table className=" text-amber-950  text-2xl ">
                  <tbody>
                    <tr>
                      <th className="w-1/5 text-left font-bold">ชื่อเเยก:</th>
                      <td className="font-normal">
                        {mockdata[selectedItem.id].intersectionName}
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
                      <td className="font-normal">
                        {mockdata[selectedItem.id].direction}
                      </td>
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
      </div>
    </div>
  );
}
