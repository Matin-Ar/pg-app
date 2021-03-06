import "./App.css";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

import EDITLOGO from "./edit.png";
import DeleteLOGO from "./delete.png";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Create a client
const queryClient = new QueryClient();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: "#ff43bb",
    },
  },
});

function App() {
  const classes = useStyles();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditCityMode, setIsEditCityMode] = useState(false);
  const [isEditStoreMode, setIsEditStoreMode] = useState(false);
  const [isEditAvailableMode, setIsEditAvailableMode] = useState(false);
  const [isEditBookMode, setIsEditBookMode] = useState(false);
  const [isEditSellMode, setIsEditSellMode] = useState(false);
  const [isEditFactorMode, setIsEditFactorMode] = useState(false);
  const [isEditCustomerMode, setIsEditCustomerMode] = useState(false);
  const [isEditEmployeeMode, setIsEditEmployeeMode] = useState(false);

  const [EditCityName, setEditCityName] = useState("");
  const [EditCityCode, setEditCityCode] = useState("");
  const [EditCityProvince, setEditCityProvince] = useState("");

  const [EditstoreCityCode, setEditStoreCityCode] = useState("");
  const [EditstoreStoreCode, setEditStoreStoreCode] = useState("");
  const [EditstoreAddress, setEditStoreAddress] = useState("");
  const [EditstoreTelphone, setEditStoreTelphone] = useState("");

  const [EDITavailableBookCode, setEDITAvailableBookCode] = useState("");
  const [EDITavailableStoreCode, setEDITAvailableStoreCode] = useState("");
  const [EDITavailableCount, setEDITAvailableCount] = useState("");
  const [EDITavailableDescription, setEDITAvailableDescription] = useState("");

  const [EDITbookBookCode, setEDITbookBookCode] = useState("");
  const [EDITbookTitle, setEDITbookTitle] = useState("");
  const [EDITbookWriter, setEDITbookWriter] = useState("");
  const [EDITbookTopic, setEDITbookTopic] = useState("");
  const [EDITbookPurchasePrice, setEDITbookPurchasePrice] = useState("");
  const [EDITbookPublisher, setEDITbookPublisher] = useState("");

  const [EditSellBookCode, setEditSellBookCode] = useState("");
  const [EDITsellFactorNum, setEDITSellFactorNum] = useState("");
  const [EDITsellCount, setEDITSellCount] = useState("");
  const [EDITsellSalePrice, setEDITSellSalePrice] = useState("");

  const [EDITfactorFactorNum, setEDITFactorFactorNum] = useState("");
  const [EDITfactorCustomerCode, setEDITFactorCustomerCode] = useState("");
  const [EDITfactorStoreCode, setEDITFactorStoreCode] = useState("");
  const [EDITfactorEmployeeCode, setEDITFactorEmployeeCode] = useState("");
  const [EDITfactorDateFactor, setEDITFactorDateFactor] = useState("");

  const [EditcustomerCustomerCode, setEditCustomerCustomerCode] = useState("");
  const [EditCustomerCName, setEditCustomerCName] = useState("");
  const [EditCustomerCphone, setEditCustomerCPhone] = useState("");
  const [EditCustomerCAddress, setEditCustomerCAddress] = useState("");

  const [EDITemployeeEmployeeCode, setEDITEmployeeEmployeeCode] = useState("");
  const [EDITemployeeEName, setEDITEmployeeEName] = useState("");
  const [EDITemployeeEphone, setEDITEmployeeEphone] = useState("");
  const [EDITemployeeGender, setEDITEmployeeGender] = useState("");
  const [EDITemployeeStoreCode, setEDITEmployeeStoreCode] = useState("");

  const [selectedMenuItem, setSelectedMenuItem] = useState("city");
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [cityCityCode, setCityCityCode] = useState("");
  const [cityCityName, setCityCityName] = useState("");
  const [cityProvince, setCityProvince] = useState("");

  const [storeCityCode, setStoreCityCode] = useState("");
  const [storeStoreCode, setStoreStoreCode] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storeTelphone, setStoreTelphone] = useState("");

  const [availableBookCode, setAvailableBookCode] = useState("");
  const [availableStoreCode, setAvailableStoreCode] = useState("");
  const [availableCount, setAvailableCount] = useState("");
  const [availableDescription, setAvailableDescription] = useState("");

  const [bookBookCode, setbookBookCode] = useState("");
  const [bookTitle, setbookTitle] = useState("");
  const [bookWriter, setbookWriter] = useState("");
  const [bookTopic, setbookTopic] = useState("");
  const [bookPurchasePrice, setbookPurchasePrice] = useState("");
  const [bookPublisher, setbookPublisher] = useState("");

  const [sellBookCode, setSellBookCode] = useState("");
  const [sellFactorNum, setSellFactorNum] = useState("");
  const [sellCount, setSellCount] = useState("");
  const [sellSalePrice, setSellSalePrice] = useState("");

  const [factorFactorNum, setFactorFactorNum] = useState("");
  const [factorCustomerCode, setFactorCustomerCode] = useState("");
  const [factorStoreCode, setFactorStoreCode] = useState("");
  const [factorEmployeeCode, setFactorEmployeeCode] = useState("");
  const [factorDateFactor, setFactorDateFactor] = useState("");

  const [customerCustomerCode, setCustomerCustomerCode] = useState("");
  const [CustomerCName, setCustomerCName] = useState("");
  const [CustomerCphone, setCustomerCPhone] = useState("");
  const [CustomerCAddress, setCustomerCAddress] = useState("");

  const [employeeEmployeeCode, setEmployeeEmployeeCode] = useState("");
  const [employeeEName, setEmployeeEName] = useState("");
  const [employeeEphone, setEmployeeEphone] = useState("");
  const [employeeGender, setEmployeeGender] = useState("");
  const [employeeStoreCode, setEmployeeStoreCode] = useState("");

  const { data: data1, status } = useQuery("table", () => {
    return axios.get(`/api/city}`);
  });

  useEffect(() => {
    axios.get(`/api/${selectedMenuItem}`).then((res) => setData(res.data));
    console.log(data1);
  }, [selectedMenuItem]);

  const handleDeletCity = (row) => {
    axios
      .delete(`/api/city`, { data: { city_code: row } })
      .then(() => alertify.success("???? ???????????? ?????? ??????????"))
      .catch((err) => alertify.error(err.response.data.detail));
  };

  const handleDeleteStore = (row) => {
    axios
      .delete(`/api/store`, { data: { store_code: row } })
      .then(() => alertify.success("???? ???????????? ?????? ??????????"))
      .catch((err) => alertify.error(err.response.data.detail));
  };

  const handleDeleteAvailable = (row) => {
    axios
      .delete(`/api/available`, { data: { store_code: row } })
      .then(() => alertify.success("???? ???????????? ?????? ??????????"))
      .catch((err) => alertify.error(err.response.data.detail));
  };

  const handleDeleteBook = (row) => {
    axios
      .delete(`/api/book`, { data: { book_code: row } })
      .then(() => alertify.success("???? ???????????? ?????? ??????????"))
      .catch((err) => alertify.error(err.response.data.detail));
  };
  const handleDeleteSell = (row) => {
    axios
      .delete(`/api/sell`, { data: { book_code: row } })
      .then(() => alertify.success("???? ???????????? ?????? ??????????"))
      .catch((err) => alertify.error(err.response.data.detail));
  };

  const handleDeleteFactor = (row) => {
    axios
      .delete(`/api/factor`, { data: { factor_num: row } })
      .then(() => alertify.success("???? ???????????? ?????? ??????????"))
      .catch((err) => alertify.error(err.response.data.detail));
  };
  const handleDeleteCustomer = (row) => {
    axios
      .delete(`/api/customer`, { data: { customer_code: row } })
      .then(() => alertify.success("???? ???????????? ?????? ??????????"))
      .catch((err) => alertify.error(err.response.data.detail));
  };

  const handleDeleteEmployee = (row) => {
    axios
      .delete(`/api/employee`, { data: { employee_code: row } })
      .then(() => alertify.success("???? ???????????? ?????? ??????????"))
      .catch((err) => alertify.error(err.response.data.detail));
  };

  const handleCitySubmit = () => {
    if ((cityCityCode, cityCityName, cityProvince)) {
      axios
        .post("/api/city", {
          city_code: cityCityCode,
          cityname: cityCityName,
          province: cityProvince,
        })
        .then(() => alertify.success("???? ???????????? ?????????? ??????????"))
        .catch((err) => alertify.error(err.response.data.detail));
    } else {
      alertify.error("???????? ?????????? ???????? ???? ???? ?????????? ????????????");
    }
  };

  const handleStoreSubmit = () => {
    if ((storeTelphone, storeAddress, storeCityCode, storeStoreCode)) {
      axios
        .post("/api/store", {
          city_code: storeCityCode,
          store_code: storeStoreCode,
          telphone: storeTelphone,
          address: storeAddress,
        })
        .then(() => alertify.success("???? ???????????? ?????????? ??????????"))
        .catch((err) => alertify.error(err.response.data.detail));
    } else {
      alertify.error("???????? ?????????? ???????? ???? ???? ?????????? ????????????");
    }
  };

  const handleAvailableSubmit = () => {
    if (
      (availableBookCode,
      availableCount,
      availableStoreCode,
      availableDescription)
    ) {
      axios
        .post("/api/available", {
          book_code: availableBookCode,
          store_code: availableStoreCode,
          count: availableCount,
          description: availableDescription,
        })
        .then(() => alertify.success("???? ???????????? ?????????? ??????????"))
        .catch((err) => alertify.error(err.response.data.detail));
    } else {
      alertify.error("???????? ?????????? ???????? ???? ???? ?????????? ????????????");
    }
  };

  const handleBookSubmit = () => {
    if (
      (bookBookCode,
      bookTitle,
      bookWriter,
      bookTopic,
      bookPublisher,
      bookPurchasePrice)
    ) {
      axios
        .post("/api/book", {
          book_code: bookBookCode,
          title: bookTitle,
          topic: bookTopic,
          purchase_price: bookPurchasePrice,
          publisher: bookPublisher,
        })
        .then(() => alertify.success("???? ???????????? ?????????? ??????????"))
        .catch((err) => alertify.error(err.response.data.detail));
    } else {
      alertify.error("???????? ?????????? ???????? ???? ???? ?????????? ????????????");
    }
  };

  const handleSellSubmit = () => {
    if ((sellBookCode, sellFactorNum, sellCount, sellSalePrice)) {
      axios
        .post("/api/sell", {
          book_code: sellBookCode,
          factor_num: sellFactorNum,
          count: sellCount,
          sale_price: sellSalePrice,
        })
        .then(() => alertify.success("???? ???????????? ?????????? ??????????"))
        .catch((err) => alertify.error(err.response.data.detail));
    } else {
      alertify.error("???????? ?????????? ???????? ???? ???? ?????????? ????????????");
    }
  };

  const handleFactorSubmit = () => {
    if (
      (factorFactorNum,
      factorCustomerCode,
      factorStoreCode,
      factorEmployeeCode,
      factorDateFactor)
    ) {
      axios
        .post("/api/factor", {
          factor_num: factorFactorNum,
          customer_code: factorCustomerCode,
          store_code: factorStoreCode,
          employee_code: factorEmployeeCode,
          date_factor: factorDateFactor,
        })
        .then(() => alertify.success("???? ???????????? ?????????? ??????????"))
        .catch((err) => alertify.error(err.response.data.detail));
    } else {
      alertify.error("???????? ?????????? ???????? ???? ???? ?????????? ????????????");
    }
  };

  const handleCustomerSubmit = () => {
    if (
      (CustomerCAddress, CustomerCName, CustomerCphone, customerCustomerCode)
    ) {
      axios
        .post("/api/customer", {
          customer_code: customerCustomerCode,
          c_name: CustomerCName,
          c_phone: CustomerCphone,
          c_address: CustomerCAddress,
        })
        .then(() => alertify.success("???? ???????????? ?????????? ??????????"))
        .catch((err) => alertify.error(err.response.data.detail));
    } else {
      alertify.error("???????? ?????????? ???????? ???? ???? ?????????? ????????????");
    }
  };

  const handleEmployeeSubmit = () => {
    if (
      (employeeGender,
      employeeStoreCode,
      employeeEphone,
      employeeEName,
      employeeEmployeeCode)
    ) {
      axios
        .post("/api/employee", {
          employee_code: employeeEmployeeCode,
          e_name: employeeEName,
          e_phone: employeeEphone,
          store_code: employeeStoreCode,
          gender: employeeGender,
        })
        .then(() => alertify.success("???? ???????????? ?????????? ??????????"))
        .catch((err) => alertify.error(err.response.data.detail));
    } else {
      alertify.error("???????? ?????????? ???????? ???? ???? ?????????? ????????????");
    }
  };

  const handleCancelSubmit = () => {
    setIsEditMode(false);
    setIsEditCityMode(false);
    setIsEditStoreMode(false);
    setIsEditAvailableMode(false);
    setIsEditBookMode(false);
    setIsEditSellMode(false);
    setEditCityName("");
    setEditCityCode("");
    setEditCityProvince("");
    setEditStoreCityCode("");
    setEditStoreStoreCode("");
    setEditStoreAddress("");
    setEditStoreTelphone("");
    setEDITAvailableBookCode("");
    setEDITAvailableStoreCode("");
    setEDITAvailableCount("");
    setEDITAvailableDescription("");
    setEDITbookBookCode("");
    setEDITbookTitle("");
    setEDITbookWriter("");
    setEDITbookTopic("");
    setEDITbookPurchasePrice("");
    setEDITbookPublisher("");
    setEditSellBookCode("");
    setEDITSellFactorNum("");
    setEDITSellCount("");
    setEDITSellSalePrice("");
  };

  const handleCityEdit = () => {
    axios
      .patch("/api/city", {
        city_code: EditCityCode,
        cityname: EditCityName,
        province: EditCityProvince,
      })
      .then((res) => {
        if (res.status === 200) {
          alertify.success("???? ???????????? ???????? ????");
          handleCancelSubmit();
        } else {
          alertify.error("???????? ?????????? ??????");
        }
      });
  };

  const handleStoreEdit = () => {
    axios
      .patch("/api/store", {
        store_code: EditstoreStoreCode,
        address: EditstoreAddress,
        telphone: EditstoreTelphone,
        city_code: EditstoreCityCode,
      })
      .then((res) => {
        if (res.status === 200) {
          alertify.success("???? ???????????? ???????? ????");
          handleCancelSubmit();
        } else {
          alertify.error("???????? ?????????? ??????");
        }
      });
  };

  const handleAvailableEdit = () => {
    axios
      .patch("/api/available", {
        store_code: EDITavailableStoreCode,
        book_code: EDITavailableBookCode,
        count: EDITavailableCount,
        description: EDITavailableDescription,
      })
      .then((res) => {
        if (res.status === 200) {
          alertify.success("???? ???????????? ???????? ????");
          handleCancelSubmit();
        } else {
          alertify.error("???????? ?????????? ??????");
        }
      });
  };

  const handleBookEdit = () => {
    axios
      .patch("/api/book", {
        book_code: EDITbookBookCode,
        title: EDITbookTitle,
        writer: EDITbookWriter,
        topic: EDITbookTopic,
        purchase_price: EDITbookPurchasePrice,
        publisher: EDITbookPublisher,
      })
      .then((res) => {
        if (res.status === 200) {
          alertify.success("???? ???????????? ???????? ????");
          handleCancelSubmit();
        } else {
          alertify.error("???????? ?????????? ??????");
        }
      });
  };

  const handleSellEdit = () => {
    axios
      .patch("/api/sell", {
        book_code: EditSellBookCode,
        factor_num: EDITsellFactorNum,
        count: EDITsellCount,
        sale_price: EDITsellSalePrice,
      })
      .then((res) => {
        if (res.status === 200) {
          alertify.success("???? ???????????? ???????? ????");
          handleCancelSubmit();
        } else {
          alertify.error("???????? ?????????? ??????");
        }
      });
  };

  const handleFactorEdit = () => {
    axios
      .patch("/api/factor", {
        factor_num: EDITfactorFactorNum,
        customer_code: EDITfactorCustomerCode,
        store_code: EDITfactorStoreCode,
        employee_code: EDITfactorEmployeeCode,
        date_factor: EDITfactorDateFactor,
      })
      .then((res) => {
        if (res.status === 200) {
          alertify.success("???? ???????????? ???????? ????");
          handleCancelSubmit();
        } else {
          alertify.error("???????? ?????????? ??????");
        }
      });
  };

  const handleCustomerEdit = () => {
    axios
      .patch("/api/customer", {
        customer_code: EditcustomerCustomerCode,
        c_name: EditCustomerCName,
        c_phone: EditCustomerCphone,
        c_address: EditCustomerCAddress,
      })
      .then((res) => {
        if (res.status === 200) {
          alertify.success("???? ???????????? ???????? ????");
          handleCancelSubmit();
        } else {
          alertify.error("???????? ?????????? ??????");
        }
      });
  };

  const handleEmployeeEdit = () => {
    axios
      .patch("/api/employee", {
        employee_code: EDITemployeeEmployeeCode,
        e_name: EDITemployeeEName,
        e_phone: EDITemployeeEphone,
        gender: EDITemployeeGender,
        store_code: EDITemployeeStoreCode,
      })
      .then((res) => {
        if (res.status === 200) {
          alertify.success("???? ???????????? ???????? ????");
          handleCancelSubmit();
        } else {
          alertify.error("???????? ?????????? ??????");
        }
      });
  };

  // Access the client
  const queryClient = useQueryClient();

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div className="wrapper">
          <div className="side-menu">
            <ul className="menu-list">
              <li
                onClick={(e) => setSelectedMenuItem("city")}
                className={`menu-item ${
                  selectedMenuItem === "city" ? "activemenu" : ""
                }`}
              >
                ???? ??????
              </li>
              <li
                onClick={(e) => setSelectedMenuItem("store")}
                className={`menu-item ${
                  selectedMenuItem === "store" ? "activemenu" : ""
                }`}
              >
                ??????????????
              </li>
              <li
                onClick={(e) => setSelectedMenuItem("available")}
                className={`menu-item ${
                  selectedMenuItem === "available" ? "activemenu" : ""
                }`}
              >
                ????????????
              </li>
              <li
                onClick={(e) => setSelectedMenuItem("book")}
                className={`menu-item ${
                  selectedMenuItem === "book" ? "activemenu" : ""
                }`}
              >
                ???????? ????
              </li>
              <li
                onClick={(e) => setSelectedMenuItem("sell")}
                className={`menu-item ${
                  selectedMenuItem === "sell" ? "activemenu" : ""
                }`}
              >
                ????????
              </li>
              <li
                onClick={(e) => setSelectedMenuItem("factor")}
                className={`menu-item ${
                  selectedMenuItem === "factor" ? "activemenu" : ""
                }`}
              >
                ????????????
              </li>
              <li
                onClick={(e) => setSelectedMenuItem("customer")}
                className={`menu-item ${
                  selectedMenuItem === "customer" ? "activemenu" : ""
                }`}
              >
                ??????????????
              </li>
              <li
                onClick={(e) => setSelectedMenuItem("employee")}
                className={`menu-item ${
                  selectedMenuItem === "employee" ? "activemenu" : ""
                }`}
              >
                ????????????????
              </li>
            </ul>
          </div>
          {!isEditMode && (
            <div className="left-box">
              <div className="left-data-wrapper">
                {/* //city */}

                {selectedMenuItem === "city" && (
                  <TableContainer className="table-container">
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow className={classes.root}>
                          <TableCell align="right">???? ??????</TableCell>
                          <TableCell align="right">?????? ??????</TableCell>
                          <TableCell align="right">??????????</TableCell>
                          <TableCell align="right">????????????</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">{row.city_code}</TableCell>
                            <TableCell align="right">{row.cityname}</TableCell>
                            <TableCell align="right">{row.province}</TableCell>
                            <TableCell align="right">
                              <button
                                className="mybtn delete"
                                onClick={(e) => handleDeletCity(row.city_code)}
                              >
                                delete
                              </button>

                              <button
                                className="mybtn edit"
                                onClick={(e) => {
                                  setIsEditMode(true);
                                  setIsEditCityMode(true);
                                  setEditCityCode(row.city_code);
                                  setEditCityName(row.cityname);
                                  setEditCityProvince(row.province);
                                }}
                              >
                                edit
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="insert-wrapper">
                      <input
                        className="city-input"
                        type="text"
                        placeholder="???? ??????"
                        value={cityCityCode}
                        onChange={(e) => setCityCityCode(e.target.value)}
                      />
                      <input
                        className="city-input"
                        type="text"
                        placeholder="?????? ??????"
                        value={cityCityName}
                        onChange={(e) => setCityCityName(e.target.value)}
                      />
                      <input
                        className="city-input"
                        type="text"
                        placeholder="?????? ??????????"
                        value={cityProvince}
                        onChange={(e) => setCityProvince(e.target.value)}
                      />
                      <button
                        className="city-submit"
                        onClick={handleCitySubmit}
                      >
                        ????????????
                      </button>
                    </div>
                  </TableContainer>
                )}

                {selectedMenuItem === "store" && (
                  <TableContainer className="table-container">
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow className={classes.root}>
                          <TableCell align="right">???? ??????????????</TableCell>
                          <TableCell align="right">????????</TableCell>
                          <TableCell align="right">?????????? ????????</TableCell>
                          <TableCell align="right">???? ??????</TableCell>
                          <TableCell align="right">????????????</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">
                              {row.store_code}
                            </TableCell>

                            <TableCell align="right">{row.address}</TableCell>
                            <TableCell align="right">{row.telphone}</TableCell>
                            <TableCell align="right">{row.city_code}</TableCell>
                            <TableCell align="right">
                              <button
                                className="mybtn delete"
                                onClick={(e) =>
                                  handleDeleteStore(row.store_code)
                                }
                              >
                                delete
                              </button>

                              <button
                                className="mybtn edit"
                                onClick={(e) => {
                                  setIsEditMode(true);
                                  setIsEditStoreMode(true);
                                  setEditStoreCityCode(row.city_code);
                                  setEditStoreStoreCode(row.store_code);
                                  setEditStoreAddress(row.address);
                                  setEditStoreTelphone(row.telphone);
                                }}
                              >
                                edit
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="insert-wrapper">
                      <input
                        className="store-input"
                        type="text"
                        placeholder="???? ??????"
                        value={storeCityCode}
                        onChange={(e) => setStoreCityCode(e.target.value)}
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="???? ??????????????"
                        value={storeStoreCode}
                        onChange={(e) => setStoreStoreCode(e.target.value)}
                      />

                      <input
                        className="store-input"
                        type="text"
                        placeholder="????????"
                        value={storeAddress}
                        onChange={(e) => setStoreAddress(e.target.value)}
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="????????"
                        value={storeTelphone}
                        onChange={(e) => setStoreTelphone(e.target.value)}
                      />
                      <button
                        className="city-submit"
                        onClick={handleStoreSubmit}
                      >
                        ????????????
                      </button>
                    </div>
                  </TableContainer>
                )}

                {selectedMenuItem === "available" && (
                  <TableContainer className="table-container">
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow className={classes.root}>
                          <TableCell align="right">???? ??????????????</TableCell>
                          <TableCell align="right">???? ????????</TableCell>
                          <TableCell align="right">????????????</TableCell>
                          <TableCell align="right">??????????????</TableCell>
                          <TableCell align="right">????????????</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">
                              {row.store_code}
                            </TableCell>

                            <TableCell align="right">{row.book_code}</TableCell>
                            <TableCell align="right">{row.count}</TableCell>
                            <TableCell align="right">
                              {row.description}
                            </TableCell>
                            <TableCell align="right">
                              <button
                                className="mybtn delete"
                                onClick={(e) =>
                                  handleDeleteAvailable(row.store_code)
                                }
                              >
                                delete
                              </button>

                              <button
                                className="mybtn edit"
                                onClick={(e) => {
                                  setIsEditMode(true);
                                  setIsEditAvailableMode(true);
                                  setEDITAvailableBookCode(row.book_code);
                                  setEDITAvailableCount(row.count);
                                  setEDITAvailableStoreCode(row.store_code);
                                  setEDITAvailableDescription(row.description);
                                }}
                              >
                                edit
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="insert-wrapper">
                      <input
                        className="store-input"
                        type="text"
                        placeholder="???? ????????"
                        value={availableBookCode}
                        onChange={(e) => setAvailableBookCode(e.target.value)}
                      />

                      <input
                        className="store-input"
                        type="text"
                        placeholder="???? ??????????????"
                        value={availableStoreCode}
                        onChange={(e) => setAvailableStoreCode(e.target.value)}
                      />

                      <input
                        className="store-input"
                        type="text"
                        placeholder="??????????"
                        value={availableCount}
                        onChange={(e) => setAvailableCount(e.target.value)}
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="??????????????"
                        value={availableDescription}
                        onChange={(e) =>
                          setAvailableDescription(e.target.value)
                        }
                      />
                      <button
                        className="city-submit"
                        onClick={handleAvailableSubmit}
                      >
                        ????????????
                      </button>
                    </div>
                  </TableContainer>
                )}

                {selectedMenuItem === "book" && (
                  <TableContainer className="table-container">
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow className={classes.root}>
                          <TableCell align="right">???? ????????</TableCell>
                          <TableCell align="right">??????????</TableCell>
                          <TableCell align="right">??????????????</TableCell>
                          <TableCell align="right">??????????</TableCell>
                          <TableCell align="right">????????</TableCell>

                          <TableCell align="right">???????? ????????</TableCell>
                          <TableCell align="right">????????????</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">{row.book_code}</TableCell>

                            <TableCell align="right">{row.title}</TableCell>
                            <TableCell align="right">{row.writer}</TableCell>
                            <TableCell align="right">{row.topic}</TableCell>
                            <TableCell align="right">{row.publisher}</TableCell>
                            <TableCell align="right">
                              {row.purchase_price}
                            </TableCell>
                            <TableCell align="right">
                              <button
                                className="mybtn delete"
                                onClick={(e) => handleDeleteBook(row.book_code)}
                              >
                                delete
                              </button>

                              <button
                                className="mybtn edit"
                                onClick={(e) => {
                                  setIsEditMode(true);
                                  setIsEditBookMode(true);
                                  setEDITbookBookCode(row.book_code);
                                  setEDITbookTitle(row.title);
                                  setEDITbookWriter(row.writer);
                                  setEDITbookTopic(row.topic);
                                  setEDITbookPublisher(row.publisher);
                                  setEDITbookPurchasePrice(row.purchase_price);
                                }}
                              >
                                edit
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="insert-wrapper">
                      <input
                        className="store-input"
                        type="text"
                        placeholder="???? ????????"
                        value={bookBookCode}
                        onChange={(e) => setbookBookCode(e.target.value)}
                      />

                      <input
                        className="store-input"
                        type="text"
                        placeholder="?????????? ????????"
                        value={bookTitle}
                        onChange={(e) => setbookTitle(e.target.value)}
                      />

                      <input
                        className="store-input"
                        type="text"
                        placeholder="??????????????"
                        value={bookWriter}
                        onChange={(e) => setbookWriter(e.target.value)}
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="??????????"
                        value={bookTopic}
                        onChange={(e) => setbookTopic(e.target.value)}
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="???????? ????????"
                        value={bookPurchasePrice}
                        onChange={(e) => setbookPurchasePrice(e.target.value)}
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="????????"
                        value={bookPublisher}
                        onChange={(e) => setbookPublisher(e.target.value)}
                      />
                      <button
                        className="city-submit"
                        onClick={handleBookSubmit}
                      >
                        ????????????
                      </button>
                    </div>
                  </TableContainer>
                )}

                {selectedMenuItem === "sell" && (
                  <TableContainer className="table-container">
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow className={classes.root}>
                          <TableCell align="right">???? ????????</TableCell>
                          <TableCell align="right">?????????? ????????????</TableCell>
                          <TableCell align="right">??????????</TableCell>
                          <TableCell align="right">???????? ????????</TableCell>
                          <TableCell align="right">????????????</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">{row.book_code}</TableCell>

                            <TableCell align="right">
                              {row.factor_num}
                            </TableCell>
                            <TableCell align="right">{row.count}</TableCell>

                            <TableCell align="right">
                              {row.sale_price}
                            </TableCell>
                            <TableCell align="right">
                              <button
                                className="mybtn delete"
                                onClick={(e) => handleDeleteSell(row.book_code)}
                              >
                                delete
                              </button>

                              <button
                                className="mybtn edit"
                                onClick={(e) => {
                                  console.log("sell book is ", row.book_code);
                                  setIsEditMode(true);
                                  setIsEditSellMode(true);
                                  setEditSellBookCode(row.book_code);

                                  setEDITSellFactorNum(row.factor_num);
                                  setEDITSellCount(row.count);
                                  setEDITSellSalePrice(row.sale_price);
                                }}
                              >
                                edit
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="insert-wrapper">
                      <input
                        className="store-input"
                        type="text"
                        placeholder="???? ????????"
                        value={sellBookCode}
                        onChange={(e) => setSellBookCode(e.target.value)}
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="?????????? ????????????"
                        value={sellFactorNum}
                        onChange={(e) => setSellFactorNum(e.target.value)}
                      />

                      <input
                        className="store-input"
                        type="text"
                        placeholder="??????????"
                        value={sellCount}
                        onChange={(e) => setSellCount(e.target.value)}
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="???????? ????????"
                        value={sellSalePrice}
                        onChange={(e) => setSellSalePrice(e.target.value)}
                      />
                      <button
                        className="city-submit"
                        onClick={handleSellSubmit}
                      >
                        ????????????
                      </button>
                    </div>
                  </TableContainer>
                )}

                {selectedMenuItem === "factor" && (
                  <TableContainer className="table-container">
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow className={classes.root}>
                          <TableCell align="right">?????????? ????????????</TableCell>

                          <TableCell align="right">???? ??????????</TableCell>
                          <TableCell align="right">???? ??????????????</TableCell>
                          <TableCell align="right">???? ????????????</TableCell>

                          <TableCell align="right">?????????? ????????????</TableCell>
                          <TableCell align="right">????????????</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">
                              {row.factor_num}
                            </TableCell>

                            <TableCell align="right">
                              {row.customer_code}
                            </TableCell>
                            <TableCell align="right">
                              {row.store_code}
                            </TableCell>
                            <TableCell align="right">
                              {row.employee_code}
                            </TableCell>

                            <TableCell align="right">
                              {row.date_factor}
                            </TableCell>
                            <TableCell align="right">
                              <button
                                className="mybtn delete"
                                onClick={(e) =>
                                  handleDeleteFactor(row.factor_num)
                                }
                              >
                                delete
                              </button>

                              <button
                                className="mybtn edit"
                                onClick={(e) => {
                                  setIsEditMode(true);
                                  setIsEditFactorMode(true);
                                  setEDITFactorFactorNum(row.factor_num);
                                  setEDITFactorCustomerCode(row.customer_code);
                                  setEDITFactorStoreCode(row.store_code);
                                  setEDITFactorEmployeeCode(row.employee_code);
                                  setEDITFactorDateFactor(row.date_factor);
                                }}
                              >
                                edit
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="insert-wrapper">
                      <input
                        className="store-input"
                        type="text"
                        placeholder="?????????? ????????????"
                        value={factorFactorNum}
                        onChange={(e) => setFactorFactorNum(e.target.value)}
                      />

                      <input
                        className="store-input"
                        type="text"
                        placeholder="???? ??????????"
                        value={factorCustomerCode}
                        onChange={(e) => setFactorCustomerCode(e.target.value)}
                      />

                      <input
                        className="store-input"
                        type="text"
                        placeholder="???? ??????????????"
                        value={factorStoreCode}
                        onChange={(e) => setFactorStoreCode(e.target.value)}
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="???? ??????????????"
                        value={factorEmployeeCode}
                        onChange={(e) => setFactorEmployeeCode(e.target.value)}
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="?????????? ????????????"
                        value={factorDateFactor}
                        onChange={(e) => setFactorDateFactor(e.target.value)}
                      />

                      <button
                        className="city-submit"
                        onClick={handleFactorSubmit}
                      >
                        ????????????
                      </button>
                    </div>
                  </TableContainer>
                )}

                {selectedMenuItem === "customer" && (
                  <TableContainer className="table-container">
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow className={classes.root}>
                          <TableCell align="right">???? ??????????</TableCell>

                          <TableCell align="right">?????? ??????????</TableCell>

                          <TableCell align="right">?????????? ?????????? ??????????</TableCell>
                          <TableCell align="right">???????? ??????????</TableCell>
                          <TableCell align="right">????????????</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">
                              {row.customer_code}
                            </TableCell>

                            <TableCell align="right">{row.c_name}</TableCell>

                            <TableCell align="right">{row.c_phone}</TableCell>
                            <TableCell align="right">{row.c_address}</TableCell>
                            <TableCell align="right">
                              <button
                                className="mybtn delete"
                                onClick={(e) =>
                                  handleDeleteCustomer(row.customer_code)
                                }
                              >
                                delete
                              </button>

                              <button
                                className="mybtn edit"
                                onClick={(e) => {
                                  setIsEditMode(true);
                                  setIsEditCustomerMode(true);
                                  setEditCustomerCustomerCode(
                                    row.customer_code
                                  );
                                  setEditCustomerCName(row.c_name);
                                  setEditCustomerCPhone(row.c_phone);
                                  setEditCustomerCAddress(row.c_address);
                                }}
                              >
                                edit
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="insert-wrapper">
                      <input
                        className="store-input"
                        type="text"
                        placeholder="???? ??????????"
                        value={customerCustomerCode}
                        onChange={(e) =>
                          setCustomerCustomerCode(e.target.value)
                        }
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="?????? ??????????"
                        value={CustomerCName}
                        onChange={(e) => setCustomerCName(e.target.value)}
                      />

                      <input
                        className="store-input"
                        type="text"
                        placeholder="?????????? ??????????"
                        value={CustomerCphone}
                        onChange={(e) => setCustomerCPhone(e.target.value)}
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="???????? ??????????"
                        value={CustomerCAddress}
                        onChange={(e) => setCustomerCAddress(e.target.value)}
                      />
                      <button
                        className="city-submit"
                        onClick={handleCustomerSubmit}
                      >
                        ????????????
                      </button>
                    </div>
                  </TableContainer>
                )}

                {selectedMenuItem === "employee" && (
                  <TableContainer className="table-container">
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                      <TableHead>
                        <TableRow className={classes.root}>
                          <TableCell align="right">???? ????????????</TableCell>

                          <TableCell align="right">?????? ????????????</TableCell>

                          <TableCell align="right">
                            ?????????? ?????????? ????????????
                          </TableCell>
                          <TableCell align="right">??????????</TableCell>

                          <TableCell align="right">???? ????????</TableCell>
                          <TableCell align="right">????????????</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="right">
                              {row.employee_code}
                            </TableCell>

                            <TableCell align="right">{row.e_name}</TableCell>

                            <TableCell align="right">{row.e_phone}</TableCell>
                            <TableCell align="right">{row.gender}</TableCell>

                            <TableCell align="right">
                              {row.store_code}
                            </TableCell>
                            <TableCell align="right">
                              <button
                                className="mybtn delete"
                                onClick={(e) =>
                                  handleDeleteEmployee(row.employee_code)
                                }
                              >
                                delete
                              </button>

                              <button
                                className="mybtn edit"
                                onClick={(e) => {
                                  setIsEditMode(true);
                                  setIsEditEmployeeMode(true);
                                  setEDITEmployeeEName(row.e_name);
                                  setEDITEmployeeEmployeeCode(
                                    row.employee_code
                                  );
                                  setEDITEmployeeEphone(row.e_phone);
                                  setEDITEmployeeGender(row.gender);
                                  setEDITEmployeeStoreCode(row.store_code);
                                }}
                              >
                                edit
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="insert-wrapper">
                      <input
                        className="store-input"
                        type="text"
                        placeholder="???? ??????????????"
                        value={employeeEmployeeCode}
                        onChange={(e) =>
                          setEmployeeEmployeeCode(e.target.value)
                        }
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="?????? ??????????????"
                        value={employeeEName}
                        onChange={(e) => setEmployeeEName(e.target.value)}
                      />

                      <input
                        className="store-input"
                        type="text"
                        placeholder="?????????? ??????????????"
                        value={employeeEphone}
                        onChange={(e) => setEmployeeEphone(e.target.value)}
                      />
                      <input
                        className="store-input"
                        type="text"
                        placeholder="?????????? ??????????????"
                        value={employeeGender}
                        onChange={(e) => setEmployeeGender(e.target.value)}
                      />
                      <button
                        className="city-submit"
                        onClick={handleEmployeeSubmit}
                      >
                        ????????????
                      </button>
                    </div>
                  </TableContainer>
                )}
              </div>
            </div>
          )}

          {isEditMode && isEditCityMode && (
            <div className="left-box">
              <div className="left-data-wrapper">
                <div className="edit-wrapper">
                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ??????"
                    value={EditCityCode}
                    onChange={(e) => setEditCityCode(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="?????? ??????"
                    value={EditCityName}
                    onChange={(e) => setEditCityName(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="?????? ??????????"
                    value={EditCityProvince}
                    onChange={(e) => setEditCityProvince(e.target.value)}
                  />
                  <button className="city-submit" onClick={handleCityEdit}>
                    ????????????
                  </button>

                  <button
                    className="cancel-submit"
                    onClick={handleCancelSubmit}
                  >
                    ????????????
                  </button>
                </div>
              </div>
            </div>
          )}

          {isEditMode && isEditStoreMode && (
            <div className="left-box">
              <div className="left-data-wrapper">
                <div className="edit-wrapper">
                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ??????????????"
                    value={EditstoreStoreCode}
                    onChange={(e) => setEditStoreStoreCode(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="???????? "
                    value={EditstoreAddress}
                    onChange={(e) => setEditStoreAddress(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="?????????? ????????"
                    value={EditstoreTelphone}
                    onChange={(e) => setEditStoreTelphone(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ??????"
                    value={EditstoreCityCode}
                    onChange={(e) => setEditStoreCityCode(e.target.value)}
                  />
                  <button className="city-submit" onClick={handleStoreEdit}>
                    ????????????
                  </button>

                  <button
                    className="cancel-submit"
                    onClick={handleCancelSubmit}
                  >
                    ????????????
                  </button>
                </div>
              </div>
            </div>
          )}

          {isEditMode && isEditAvailableMode && (
            <div className="left-box">
              <div className="left-data-wrapper">
                <div className="edit-wrapper">
                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ????????"
                    value={EDITavailableBookCode}
                    onChange={(e) => setEDITAvailableBookCode(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ??????????????"
                    value={EDITavailableStoreCode}
                    onChange={(e) => setEDITAvailableStoreCode(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="??????????"
                    value={EDITavailableCount}
                    onChange={(e) => setEDITAvailableCount(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="??????????????"
                    value={EDITavailableDescription}
                    onChange={(e) =>
                      setEDITAvailableDescription(e.target.value)
                    }
                  />
                  <button className="city-submit" onClick={handleAvailableEdit}>
                    ????????????
                  </button>

                  <button
                    className="cancel-submit"
                    onClick={handleCancelSubmit}
                  >
                    ????????????
                  </button>
                </div>
              </div>
            </div>
          )}

          {isEditMode && isEditBookMode && (
            <div className="left-box">
              <div className="left-data-wrapper">
                <div className="edit-wrapper">
                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ????????"
                    value={EDITbookBookCode}
                    onChange={(e) => setEDITbookBookCode(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="?????????? ????????"
                    value={EDITbookTitle}
                    onChange={(e) => setEDITbookTitle(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="??????????????"
                    value={EDITbookWriter}
                    onChange={(e) => setEDITbookWriter(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="??????????"
                    value={EDITbookTopic}
                    onChange={(e) => setEDITbookTopic(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="???????? ????????"
                    value={EDITbookPurchasePrice}
                    onChange={(e) => setEDITbookPurchasePrice(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="????????"
                    value={EDITbookPublisher}
                    onChange={(e) => setEDITbookPublisher(e.target.value)}
                  />

                  <button className="city-submit" onClick={handleBookEdit}>
                    ????????????
                  </button>

                  <button
                    className="cancel-submit"
                    onClick={handleCancelSubmit}
                  >
                    ????????????
                  </button>
                </div>
              </div>
            </div>
          )}

          {isEditMode && isEditSellMode && (
            <div className="left-box">
              <div className="left-data-wrapper">
                <div className="edit-wrapper">
                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ????????"
                    value={EditSellBookCode}
                    onChange={(e) => setEditSellBookCode(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="?????????? ????????????"
                    value={EDITsellFactorNum}
                    onChange={(e) => setEDITSellFactorNum(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="??????????"
                    value={EDITsellCount}
                    onChange={(e) => setEDITSellCount(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="???????? ????????"
                    value={EDITsellSalePrice}
                    onChange={(e) => setEDITSellSalePrice(e.target.value)}
                  />

                  <button className="city-submit" onClick={handleSellEdit}>
                    ????????????
                  </button>

                  <button
                    className="cancel-submit"
                    onClick={handleCancelSubmit}
                  >
                    ????????????
                  </button>
                </div>
              </div>
            </div>
          )}

          {isEditMode && isEditFactorMode && (
            <div className="left-box">
              <div className="left-data-wrapper">
                <div className="edit-wrapper">
                  <input
                    className="city-input"
                    type="text"
                    placeholder="?????????? ????????????"
                    value={EDITfactorFactorNum}
                    onChange={(e) => setEDITFactorFactorNum(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ??????????"
                    value={EDITfactorCustomerCode}
                    onChange={(e) => setEDITFactorCustomerCode(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ??????????????"
                    value={EDITfactorStoreCode}
                    onChange={(e) => setEDITFactorStoreCode(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ????????????"
                    value={EDITfactorEmployeeCode}
                    onChange={(e) => setEDITFactorEmployeeCode(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="?????????? ????????????"
                    value={EDITfactorDateFactor}
                    onChange={(e) => setEDITFactorDateFactor(e.target.value)}
                  />

                  <button className="city-submit" onClick={handleFactorEdit}>
                    ????????????
                  </button>

                  <button
                    className="cancel-submit"
                    onClick={handleCancelSubmit}
                  >
                    ????????????
                  </button>
                </div>
              </div>
            </div>
          )}

          {isEditMode && isEditCustomerMode && (
            <div className="left-box">
              <div className="left-data-wrapper">
                <div className="edit-wrapper">
                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ??????????"
                    value={EditcustomerCustomerCode}
                    onChange={(e) =>
                      setEditCustomerCustomerCode(e.target.value)
                    }
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="?????? ??????????"
                    value={EditCustomerCName}
                    onChange={(e) => setEditCustomerCName(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="?????????? ????????"
                    value={EditCustomerCphone}
                    onChange={(e) => setEditCustomerCPhone(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="????????"
                    value={EditCustomerCAddress}
                    onChange={(e) => setEditCustomerCAddress(e.target.value)}
                  />

                  <button className="city-submit" onClick={handleCustomerEdit}>
                    ????????????
                  </button>

                  <button
                    className="cancel-submit"
                    onClick={handleCancelSubmit}
                  >
                    ????????????
                  </button>
                </div>
              </div>
            </div>
          )}

          {isEditMode && isEditEmployeeMode && (
            <div className="left-box">
              <div className="left-data-wrapper">
                <div className="edit-wrapper">
                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ????????????"
                    value={EDITemployeeEmployeeCode}
                    onChange={(e) =>
                      setEDITEmployeeEmployeeCode(e.target.value)
                    }
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="?????? ????????????"
                    value={EDITemployeeEName}
                    onChange={(e) => setEDITEmployeeEName(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="?????????? ????????"
                    value={EDITemployeeEphone}
                    onChange={(e) => setEDITEmployeeEphone(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="??????????"
                    value={EDITemployeeGender}
                    onChange={(e) => setEDITEmployeeGender(e.target.value)}
                  />

                  <input
                    className="city-input"
                    type="text"
                    placeholder="???? ??????????????"
                    value={EDITemployeeStoreCode}
                    onChange={(e) => setEDITEmployeeStoreCode(e.target.value)}
                  />

                  <button className="city-submit" onClick={handleEmployeeEdit}>
                    ????????????
                  </button>

                  <button
                    className="cancel-submit"
                    onClick={handleCancelSubmit}
                  >
                    ????????????
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
