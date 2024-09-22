export const backend_pdf_prefix: string = "/";

export const SERVER_BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_BASE_URL;
// export const SERVER_BASE_URL = "http://localhost:3333";
export const BASE_URLS = [
  //1. PDF
  `${SERVER_BASE_URL}${backend_pdf_prefix}`,
  //2. example
  "https://api2.example.com",
];
