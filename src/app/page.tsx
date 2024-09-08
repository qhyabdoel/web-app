"use client";

import { getDataFromAPI, sendDataToAPI } from "@/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import editIcon from "@/assets/edit-icon.svg";
import deleteIcon from "@/assets/delete-icon.svg";
import Swal from "sweetalert2";

export default function Home() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState("list");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeAge, setEmployeeAge] = useState(0);
  const [employeeSalary, setEmployeeSalary] = useState(0);

  interface EmployeePropsType {
    id: number;
    employee_name: string;
    employee_salary: number;
    employee_age: number;
  }

  const getData = () => {
    getDataFromAPI("employees")
      .then((res) => setRows(res.data))
      .catch((err) => console.log({ err }));
  };

  const createData = () => {
    if (employeeAge && employeeName && employeeSalary)
      sendDataToAPI(
        "create",
        {
          employee_name: employeeName,
          employee_age: employeeAge,
          employee_salary: employeeSalary,
        },
        "POST"
      )
        .then((res) => {
          console.log({ res });
          if (res.status === "success") {
            setEmployeeName("");
            setEmployeeAge(0);
            setEmployeeSalary(0);
            handleSucces();
          }
        })
        .catch((err) => console.log({ err }));
  };

  useEffect(() => getData(), []);

  const handleSucces = () => {
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success",
    });
  };

  return (
    <div className="flex flex-row">
      <div className="flex-none w-64 px-16 py-16">
        <label
          className="text-xl font-bold cursor-pointer"
          onClick={() => setPage("list")}
        >
          Employees
        </label>
      </div>
      <div className="bg-gray-50 p-16 min-h-screen text-gray-800 flex-auto">
        {page === "list" ? (
          <>
            <div className="mb-8">
              <button
                className="bg-blue-600 text-white px-10 py-2 rounded-md"
                onClick={() => setPage("create")}
              >
                Create
              </button>
            </div>
            <table className="table-auto w-full text-left">
              <thead>
                <tr className=" border-b-2">
                  <th className="pb-2">#</th>
                  <th>Name</th>
                  <th>Salary</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((item: EmployeePropsType, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-6">{item.id}</td>
                    <td>{item.employee_name}</td>
                    <td>{item.employee_salary}</td>
                    <td>{item.employee_age}</td>
                    <td>
                      <div className="flex flex-row">
                        <button className="bg-blue-300 p-2 rounded-md mx-2">
                          <Image src={editIcon} alt="" />
                        </button>
                        <button className="bg-red-400 p-2 rounded-md mx-2">
                          <Image src={deleteIcon} alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : page === "create" ? (
          <>
            <div className="mb-4">
              <div className="mb-1">
                <label>Name</label>
              </div>
              <div>
                <input
                  placeholder="Name"
                  className="py-1 px-2 border border-gray-400 rounded-md w-96"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
              </div>
              <div className="mt-0.5">
                <label
                  className={`text-sm px-2 py-1 rounded-sm ${
                    employeeName ? "bg-green-600" : "bg-red-400"
                  } text-white`}
                >
                  {employeeName ? "Looks good" : "Name is required"}
                </label>
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-1">
                <label>Age</label>
              </div>
              <div>
                <input
                  placeholder="Age"
                  type="number"
                  className="py-1 px-2 border border-gray-400 rounded-md"
                  value={employeeAge}
                  onChange={(e) => setEmployeeAge(Number(e.target.value))}
                />
              </div>
              <div className="mt-0.5">
                <label
                  className={`text-sm px-2 py-1 rounded-sm ${
                    employeeAge ? "bg-green-600" : "bg-red-400"
                  } text-white`}
                >
                  {employeeAge ? "Looks good" : "Age is required"}
                </label>
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-1">
                <label>Salary</label>
              </div>
              <div>
                <input
                  placeholder="Salary"
                  type="number"
                  className="py-1 px-2 border border-gray-400 rounded-md w-96"
                  value={employeeSalary}
                  onChange={(e) => setEmployeeSalary(Number(e.target.value))}
                ></input>
              </div>
              <div className="mt-0.5">
                <label
                  className={`text-sm px-2 py-1 rounded-sm ${
                    employeeSalary ? "bg-green-600" : "bg-red-400"
                  } text-white`}
                >
                  {employeeSalary ? "Looks good" : "Salary is required"}
                </label>
              </div>
            </div>
            <div className="my-12">
              <button
                className={`${
                  employeeName && employeeAge && employeeSalary
                    ? "bg-blue-500"
                    : "bg-gray-400"
                } text-white px-8 py-2 rounded-md`}
                onClick={createData}
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
