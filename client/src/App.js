import "./App.css";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

import EDITLOGO from "./edit.png";
import DeleteLOGO from "./delete.png";

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

function App() {
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

  useEffect(() => {
    axios.get(`/api/${selectedMenuItem}`).then((res) => setData(res.data));
  }, [selectedMenuItem]);

  const handleDeletCity = (row) => {
    axios
      .delete(`/api/city`, { data: { city_code: row } })
      .then(() => alertify.success("با موفقیت حذف گردید"))
      .catch((err) => alertify.error(err.response.data.detail));
  };

  const handleDeleteStore = (row) => {
    axios
      .delete(`/api/store`, { data: { store_code: row } })
      .then(() => alertify.success("با موفقیت حذف گردید"))
      .catch((err) => alertify.error(err.response.data.detail));
  };

  const handleDeleteAvailable = (row) => {
    axios
      .delete(`/api/available`, { data: { store_code: row } })
      .then(() => alertify.success("با موفقیت حذف گردید"))
      .catch((err) => alertify.error(err.response.data.detail));
  };

  const handleDeleteBook = (row) => {
    axios
      .delete(`/api/book`, { data: { book_code: row } })
      .then(() => alertify.success("با موفقیت حذف گردید"))
      .catch((err) => alertify.error(err.response.data.detail));
  };
  const handleDeleteSell = (row) => {
    axios
      .delete(`/api/sell`, { data: { book_code: row } })
      .then(() => alertify.success("با موفقیت حذف گردید"))
      .catch((err) => alertify.error(err.response.data.detail));
  };

  const handleDeleteFactor = (row) => {
    axios
      .delete(`/api/factor`, { data: { factor_num: row } })
      .then(() => alertify.success("با موفقیت حذف گردید"))
      .catch((err) => alertify.error(err.response.data.detail));
  };
  const handleDeleteCustomer = (row) => {
    axios
      .delete(`/api/customer`, { data: { customer_code: row } })
      .then(() => alertify.success("با موفقیت حذف گردید"))
      .catch((err) => alertify.error(err.response.data.detail));
  };

  const handleDeleteEmployee = (row) => {
    axios
      .delete(`/api/employee`, { data: { employee_code: row } })
      .then(() => alertify.success("با موفقیت حذف گردید"))
      .catch((err) => alertify.error(err.response.data.detail));
  };

  const handleCitySubmit = () => {
    if ((cityCityCode, cityCityName, cityProvince)) {
      axios.post("/api/city", {
        city_code: cityCityCode,
        cityname: cityCityName,
        province: cityProvince,
      });
    } else {
      alertify.error("لطفا تمامی فیلد ها را تکمیل نمایید");
    }
  };

  const handleStoreSubmit = () => {
    if ((storeTelphone, storeAddress, storeCityCode, storeStoreCode)) {
      axios.post("/api/store", {
        city_code: storeCityCode,
        store_code: storeStoreCode,
        telphone: storeTelphone,
        address: storeAddress,
      });
    } else {
      alertify.error("لطفا تمامی فیلد ها را تکمیل نمایید");
    }
  };

  const handleAvailableSubmit = () => {
    if (
      (availableBookCode,
      availableCount,
      availableStoreCode,
      availableDescription)
    ) {
      axios.post("/api/available", {
        book_code: availableBookCode,
        store_code: availableStoreCode,
        count: availableCount,
        description: availableDescription,
      });
    } else {
      alertify.error("لطفا تمامی فیلد ها را تکمیل نمایید");
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
      axios.post("/api/book", {
        book_code: bookBookCode,
        title: bookTitle,
        topic: bookTopic,
        purchase_price: bookPurchasePrice,
        publisher: bookPublisher,
      });
    } else {
      alertify.error("لطفا تمامی فیلد ها را تکمیل نمایید");
    }
  };

  const handleSellSubmit = () => {
    if ((sellBookCode, sellFactorNum, sellCount, sellSalePrice)) {
      axios.post("/api/sell", {
        book_code: sellBookCode,
        factor_num: sellFactorNum,
        count: sellCount,
        sale_price: sellSalePrice,
      });
    } else {
      alertify.error("لطفا تمامی فیلد ها را تکمیل نمایید");
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
      axios.post("/api/factor", {
        factor_num: factorFactorNum,
        customer_code: factorCustomerCode,
        store_code: factorStoreCode,
        employee_code: factorEmployeeCode,
        date_factor: factorDateFactor,
      });
    } else {
      alertify.error("لطفا تمامی فیلد ها را تکمیل نمایید");
    }
  };

  const handleCustomerSubmit = () => {
    if (
      (CustomerCAddress, CustomerCName, CustomerCphone, customerCustomerCode)
    ) {
      axios.post("/api/customer", {
        customer_code: customerCustomerCode,
        c_name: CustomerCName,
        c_phone: CustomerCphone,
        c_address: CustomerCAddress,
      });
    } else {
      alertify.error("لطفا تمامی فیلد ها را تکمیل نمایید");
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
      axios.post("/api/employee", {
        employee_code: employeeEmployeeCode,
        e_name: employeeEName,
        e_phone: employeeEphone,
        store_code: employeeStoreCode,
        gender: employeeGender,
      });
    } else {
      alertify.error("لطفا تمامی فیلد ها را تکمیل نمایید");
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="side-menu">
          <ul className="menu-list">
            <li
              onClick={(e) => setSelectedMenuItem("city")}
              className="menu-item"
            >
              کد شهر
            </li>
            <li
              onClick={(e) => setSelectedMenuItem("store")}
              className="menu-item"
            >
              فروشگاه
            </li>
            <li
              onClick={(e) => setSelectedMenuItem("available")}
              className="menu-item"
            >
              موجودی
            </li>
            <li
              onClick={(e) => setSelectedMenuItem("book")}
              className="menu-item"
            >
              کتاب ها
            </li>
            <li
              onClick={(e) => setSelectedMenuItem("sell")}
              className="menu-item"
            >
              فروش
            </li>
            <li
              onClick={(e) => setSelectedMenuItem("factor")}
              className="menu-item"
            >
              فاکتور
            </li>
            <li
              onClick={(e) => setSelectedMenuItem("customer")}
              className="menu-item"
            >
              مشتریان
            </li>
            <li
              onClick={(e) => setSelectedMenuItem("employee")}
              className="menu-item"
            >
              کارمندان
            </li>
          </ul>
        </div>

        <div className="left-box">
          <Button onClick={handleOpen}>Open modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
          <div className="left-data-wrapper">
            {/* //city */}

            {selectedMenuItem === "city" && (
              <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">کد شهر</TableCell>
                      <TableCell align="right">نام شهر</TableCell>
                      <TableCell align="right">استان</TableCell>
                      <TableCell align="right">عملیات</TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="insert-wrapper">
                  <input
                    className="city-input"
                    type="text"
                    placeholder="کد شهر"
                    value={cityCityCode}
                    onChange={(e) => setCityCityCode(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="نام شهر"
                    value={cityCityName}
                    onChange={(e) => setCityCityName(e.target.value)}
                  />
                  <input
                    className="city-input"
                    type="text"
                    placeholder="نام استان"
                    value={cityProvince}
                    onChange={(e) => setCityProvince(e.target.value)}
                  />
                  <button className="city-submit" onClick={handleCitySubmit}>
                    افزودن
                  </button>
                </div>
              </TableContainer>
            )}

            {selectedMenuItem === "store" && (
              <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">کد فروشگاه</TableCell>
                      <TableCell align="right">آدرس</TableCell>
                      <TableCell align="right">شماره تلفن</TableCell>
                      <TableCell align="right">کد شهر</TableCell>
                      <TableCell align="right">عملیات</TableCell>
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
                        <TableCell align="right">{row.store_code}</TableCell>

                        <TableCell align="right">{row.address}</TableCell>
                        <TableCell align="right">{row.telphone}</TableCell>
                        <TableCell align="right">{row.city_code}</TableCell>
                        <TableCell align="right">
                          <button
                            onClick={(e) => handleDeleteStore(row.store_code)}
                          >
                            delete
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
                    placeholder="کد شهر"
                    value={storeCityCode}
                    onChange={(e) => setStoreCityCode(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="کد فروشگاه"
                    value={storeStoreCode}
                    onChange={(e) => setStoreStoreCode(e.target.value)}
                  />

                  <input
                    className="store-input"
                    type="text"
                    placeholder="آدرس"
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="تلفن"
                    value={storeTelphone}
                    onChange={(e) => setStoreTelphone(e.target.value)}
                  />
                  <button className="city-submit" onClick={handleStoreSubmit}>
                    افزودن
                  </button>
                </div>
              </TableContainer>
            )}

            {selectedMenuItem === "available" && (
              <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">کد فروشگاه</TableCell>
                      <TableCell align="right">کد کتاب</TableCell>
                      <TableCell align="right">موجودی</TableCell>
                      <TableCell align="right">توضیحات</TableCell>
                      <TableCell align="right">عملیات</TableCell>
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
                        <TableCell align="right">{row.store_code}</TableCell>

                        <TableCell align="right">{row.book_code}</TableCell>
                        <TableCell align="right">{row.count}</TableCell>
                        <TableCell align="right">{row.description}</TableCell>
                        <TableCell align="right">
                          <button
                            onClick={(e) =>
                              handleDeleteAvailable(row.store_code)
                            }
                          >
                            delete
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
                    placeholder="کد کتاب"
                    value={availableBookCode}
                    onChange={(e) => setAvailableBookCode(e.target.value)}
                  />

                  <input
                    className="store-input"
                    type="text"
                    placeholder="کد فروشگاه"
                    value={availableStoreCode}
                    onChange={(e) => setAvailableStoreCode(e.target.value)}
                  />

                  <input
                    className="store-input"
                    type="text"
                    placeholder="تعداد"
                    value={availableCount}
                    onChange={(e) => setAvailableCount(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="توضیحات"
                    value={availableDescription}
                    onChange={(e) => setAvailableDescription(e.target.value)}
                  />
                  <button
                    className="city-submit"
                    onClick={handleAvailableSubmit}
                  >
                    افزودن
                  </button>
                </div>
              </TableContainer>
            )}

            {selectedMenuItem === "book" && (
              <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">کد کتاب</TableCell>
                      <TableCell align="right">عنوان</TableCell>
                      <TableCell align="right">نویسنده</TableCell>
                      <TableCell align="right">موضوع</TableCell>
                      <TableCell align="right">ناشر</TableCell>

                      <TableCell align="right">قیمت خرید</TableCell>
                      <TableCell align="right">عملیات</TableCell>
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
                            onClick={(e) => handleDeleteBook(row.book_code)}
                          >
                            delete
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
                    placeholder="کد کتاب"
                    value={bookBookCode}
                    onChange={(e) => setbookBookCode(e.target.value)}
                  />

                  <input
                    className="store-input"
                    type="text"
                    placeholder="عنوان کتاب"
                    value={bookTitle}
                    onChange={(e) => setbookTitle(e.target.value)}
                  />

                  <input
                    className="store-input"
                    type="text"
                    placeholder="نویسنده"
                    value={bookWriter}
                    onChange={(e) => setbookWriter(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="موضوع"
                    value={bookTopic}
                    onChange={(e) => setbookTopic(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="قیمت خرید"
                    value={bookPurchasePrice}
                    onChange={(e) => setbookPurchasePrice(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="ناشر"
                    value={bookPublisher}
                    onChange={(e) => setbookPublisher(e.target.value)}
                  />
                  <button className="city-submit" onClick={handleBookSubmit}>
                    افزودن
                  </button>
                </div>
              </TableContainer>
            )}

            {selectedMenuItem === "sell" && (
              <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">کد کتاب</TableCell>
                      <TableCell align="right">شماره فاکتور</TableCell>
                      <TableCell align="right">تعداد</TableCell>
                      <TableCell align="right">قیمت فروش</TableCell>
                      <TableCell align="right">عملیات</TableCell>
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

                        <TableCell align="right">{row.factor_num}</TableCell>
                        <TableCell align="right">{row.count}</TableCell>

                        <TableCell align="right">{row.sale_price}</TableCell>
                        <TableCell align="right">
                          <button
                            onClick={(e) => handleDeleteSell(row.book_code)}
                          >
                            delete
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
                    placeholder="کد کتاب"
                    value={sellBookCode}
                    onChange={(e) => setSellBookCode(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="شماره فاکتور"
                    value={sellFactorNum}
                    onChange={(e) => setSellFactorNum(e.target.value)}
                  />

                  <input
                    className="store-input"
                    type="text"
                    placeholder="تعداد"
                    value={sellCount}
                    onChange={(e) => setSellCount(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="قیمت فروش"
                    value={sellSalePrice}
                    onChange={(e) => setSellSalePrice(e.target.value)}
                  />
                  <button className="city-submit" onClick={handleSellSubmit}>
                    افزودن
                  </button>
                </div>
              </TableContainer>
            )}

            {selectedMenuItem === "factor" && (
              <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">شماره فاکتور</TableCell>

                      <TableCell align="right">کد مشتری</TableCell>
                      <TableCell align="right">کد فروشگاه</TableCell>
                      <TableCell align="right">کد کارمند</TableCell>

                      <TableCell align="right">تاریخ فاکتور</TableCell>
                      <TableCell align="right">عملیات</TableCell>
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
                        <TableCell align="right">{row.factor_num}</TableCell>

                        <TableCell align="right">{row.customer_code}</TableCell>
                        <TableCell align="right">{row.store_code}</TableCell>
                        <TableCell align="right">{row.employee_code}</TableCell>

                        <TableCell align="right">{row.date_factor}</TableCell>
                        <TableCell align="right">
                          <button
                            onClick={(e) => handleDeleteFactor(row.factor_num)}
                          >
                            delete
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
                    placeholder="شماره فاکتور"
                    value={factorFactorNum}
                    onChange={(e) => setFactorFactorNum(e.target.value)}
                  />

                  <input
                    className="store-input"
                    type="text"
                    placeholder="کد مشتری"
                    value={factorCustomerCode}
                    onChange={(e) => setFactorCustomerCode(e.target.value)}
                  />

                  <input
                    className="store-input"
                    type="text"
                    placeholder="کد فروشگاه"
                    value={factorStoreCode}
                    onChange={(e) => setFactorStoreCode(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="کد فروشنده"
                    value={factorEmployeeCode}
                    onChange={(e) => setFactorEmployeeCode(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="تاریخ فاکتور"
                    value={factorDateFactor}
                    onChange={(e) => setFactorDateFactor(e.target.value)}
                  />

                  <button className="city-submit" onClick={handleFactorSubmit}>
                    افزودن
                  </button>
                </div>
              </TableContainer>
            )}

            {selectedMenuItem === "customer" && (
              <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">کد مشتری</TableCell>

                      <TableCell align="right">نام مشتری</TableCell>

                      <TableCell align="right">شماره همراه مشتری</TableCell>
                      <TableCell align="right">آدرس مشتری</TableCell>
                      <TableCell align="right">عملیات</TableCell>
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
                        <TableCell align="right">{row.customer_code}</TableCell>

                        <TableCell align="right">{row.c_name}</TableCell>

                        <TableCell align="right">{row.c_phone}</TableCell>
                        <TableCell align="right">{row.c_address}</TableCell>
                        <TableCell align="right">
                          <button
                            onClick={(e) =>
                              handleDeleteCustomer(row.customer_code)
                            }
                          >
                            delete
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
                    placeholder="کد مشتری"
                    value={customerCustomerCode}
                    onChange={(e) => setCustomerCustomerCode(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="نام مشتری"
                    value={CustomerCName}
                    onChange={(e) => setCustomerCName(e.target.value)}
                  />

                  <input
                    className="store-input"
                    type="text"
                    placeholder="شماره مشتری"
                    value={CustomerCphone}
                    onChange={(e) => setCustomerCPhone(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="آدرس مشتری"
                    value={CustomerCAddress}
                    onChange={(e) => setCustomerCAddress(e.target.value)}
                  />
                  <button
                    className="city-submit"
                    onClick={handleCustomerSubmit}
                  >
                    افزودن
                  </button>
                </div>
              </TableContainer>
            )}

            {selectedMenuItem === "employee" && (
              <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">کد کارمند</TableCell>

                      <TableCell align="right">نام کارمند</TableCell>

                      <TableCell align="right">شماره همراه کارمند</TableCell>
                      <TableCell align="right">جنسیت</TableCell>

                      <TableCell align="right">کد شعبه</TableCell>
                      <TableCell align="right">عملیات</TableCell>
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
                        <TableCell align="right">{row.employee_code}</TableCell>

                        <TableCell align="right">{row.e_name}</TableCell>

                        <TableCell align="right">{row.e_phone}</TableCell>
                        <TableCell align="right">{row.gender}</TableCell>

                        <TableCell align="right">{row.store_code}</TableCell>
                        <TableCell align="right">
                          <button
                            onClick={(e) =>
                              handleDeleteEmployee(row.employee_code)
                            }
                          >
                            delete
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
                    placeholder="کد فروشنده"
                    value={employeeEmployeeCode}
                    onChange={(e) => setEmployeeEmployeeCode(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="نام فروشنده"
                    value={employeeEName}
                    onChange={(e) => setEmployeeEName(e.target.value)}
                  />

                  <input
                    className="store-input"
                    type="text"
                    placeholder="شماره فروشنده"
                    value={employeeEphone}
                    onChange={(e) => setEmployeeEphone(e.target.value)}
                  />
                  <input
                    className="store-input"
                    type="text"
                    placeholder="جنسیت فروشنده"
                    value={employeeGender}
                    onChange={(e) => setEmployeeGender(e.target.value)}
                  />
                  <button
                    className="city-submit"
                    onClick={handleEmployeeSubmit}
                  >
                    افزودن
                  </button>
                </div>
              </TableContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
