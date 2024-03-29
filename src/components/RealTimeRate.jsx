import React, { useState, useMemo } from "react";
// import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useGetFluctuationQuery,
  useGetLatestQuery,
} from "../redux/api/exchangeApi";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

export default function RealTimeRate() {
  const [currency, setCurrency] = useState([]);

  const { data } = useGetFluctuationQuery({
    start_date: "2023-07-25",
    end_date: "2023-08-25",
    base: "USD",
  });
  const rates = data?.rates;
  useMemo(() => {
    for (const currency in rates) {
      if (rates.hasOwnProperty(currency)) {
        const values = rates[currency];
        const singleObject = {
          currency: currency,
          start_rate: values.start_rate,
          end_rate: values.end_rate,
          change: values.change,
          change_pct: values.change_pct,
        };
        setCurrency((prev) => [...prev, singleObject]);
      }
    }
  }, [rates]);
  return (
    <main id="fluctuation">
      <img
        className="w-full px-5 mb-10"
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNWkhzuw6M4iK4Hc6LjUXdAcBl1VG6LSSApqef3u0kmNuQWjEDxwKmBEDyLFJgGQJxrlKorhshM5HlzlDiFdKxN4Y57wZapGOV-b3Tj9zkj4V-mHSJaZA6IL-UATH4KWcQ2OIwjvRSJmGnk50izCTnpEwWVJfbDDKcrtbVMm92P81bBjMvaNkhAoEh1w/s1456/bsad.10221.gif"
        alt=""
      />
      <div className="text-center mb-5">
        <h1 className="text-3xl">Fluctuation Rates</h1>
        <p className="font-semibold py-2 text-slate-700">
          (from 2023-07-25 to 2023-08-25)
        </p>
      </div>
      <div className="px-5 md:px-0 rounded-lg overflow-hidden">
        <TableContainer className="md:px-10" sx={{ maxHeight: 500 }} component={Paper}>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
              <TableRow >
                <TableCell sx={{ fontWeight: 600, fontSize: 16, color: "#214FC6" }}>
                  1 EUR (Based)
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 16, color: "#214FC6" }} align="right">
                  Start Rate
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 16, color: "#214FC6" }} align="right">
                  End Rate
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 16, color: "#214FC6" }} align="right">
                  Change Value
                </TableCell>
                <TableCell sx={{ fontWeight: 600, fontSize: 16, color: "#214FC6" }} align="right">
                  Change Percentage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ height: 500, overflow: "scroll" }}>
              {currency?.map((i, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ fontWeight: 600, fontSize: 15, color: "#214FC6" }}
                    component="th"
                    scope="row"
                  >
                    {i.currency}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, fontSize: 15 }}
                    align="right"
                  >
                    {i.start_rate}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, fontSize: 15 }}
                    align="right"
                  >
                    {i.end_rate}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, fontSize: 15 }}
                    align="right"
                  >
                    <div className="flex items-center justify-end">
                      <span
                        className={`${
                          i.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {i.change}
                      </span>
                      {i.change < 0 ? (
                        <BsCaretDownFill className={"text-red-600"} />
                      ) : (
                        <BsCaretUpFill className={"text-green-600"} />
                      )}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: 600, fontSize: 15 }}
                    align="right"
                  >
                    <div className="flex items-center justify-end">
                      <span
                        className={`${
                          i.change_pct > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {i.change_pct}
                      </span>
                      {i.change_pct < 0 ? (
                        <BsCaretDownFill className={"text-red-600"} />
                      ) : (
                        <BsCaretUpFill className={"text-green-600"} />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </main>
  );
}
