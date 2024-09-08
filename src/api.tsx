const baseUrl = "https://dummy.restapiexample.com/api/v1";

export const getDataFromAPI = async (apiUrl: string) => {
  const response = await fetch(`${baseUrl}/${apiUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resJson = response.json();
  // console.log({ resJson });
  return await resJson;
};

interface dataProps {
  employee_name: string;
  employee_age: number;
  employee_salary: number;
}

export const sendDataToAPI = async (
  apiUrl: string,
  data: dataProps,
  method: string
) => {
  const response = await fetch(`${baseUrl}/${apiUrl}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resJson = response.json();
  // console.log({ resJson });
  return await resJson;
};
