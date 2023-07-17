/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import style from "../pages-css/add-books.module.css";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { useAddBooksMutation } from "../redux/books/booksSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { isLoading } from "../redux/features/commonOptionsSlice";
import Swal from "sweetalert2";
import type { DatePickerProps } from "antd";
import { useState } from "react";
import genre from "../../public/genre.json";
import { MyBook } from "../Interfaces/globalTypes";

const AddBook = () => {
  const [form] = Form.useForm();
  const [addBooks] = useAddBooksMutation();
  const [date, setData] = useState("");
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.commonOptions);

  const handleReset = () => {
    form.resetFields();
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date);
    setData(dateString);
  };

  const onFinish = async (value: MyBook) => {
    dispatch(isLoading(true));
    value.publicationDate = date;

    try {
      const response: any = await addBooks(value);
      dispatch(isLoading(false));

      if (response.data.acknowledged == true) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Succesfully Added a Book",
          showConfirmButton: false,
          timer: 1500,
        });
        handleReset();
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
      handleReset();
    }
  };

  return (
    <div className={style.container}>
      <div>
        <h1 className="text-2xl font-bold">Add New Book</h1>
        <br />
        <div className="border border-blue-400 p-10 shadow-lg shadow-blue-500/50  rounded">
          <div>
            <Form
              form={form}
              layout="vertical"
              colon={false}
              onFinish={onFinish}
            >
              <div className="flex justify-around g-10">
                <Form.Item
                  label="Book Title"
                  name="title"
                  rules={[{ required: true }]}
                  className="w-5/12"
                >
                  <Input size="large" placeholder="Book Title" />
                </Form.Item>

                <Form.Item
                  label="Author Name"
                  name="author"
                  rules={[{ required: true }]}
                  className="w-5/12"
                >
                  <Input size="large" placeholder="Author Name" />
                </Form.Item>
              </div>
              <div className="flex justify-around g-10">
                <Form.Item
                  label="Genre"
                  name="genre"
                  rules={[{ required: true }]}
                  className="w-5/12"
                >
                  <Select
                    size="large"
                    showSearch
                    placeholder="Select Genre"
                    optionFilterProp="children"
                    allowClear
                    filterOption={(input, option) =>
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={genre}
                  />
                </Form.Item>

                <Form.Item label="Image Link" name="image" className="w-5/12">
                  <Input size="large" placeholder="Image Link" />
                </Form.Item>
              </div>
              <div className="flex justify-center">
                <Form.Item
                  label="Publication Date"
                  name="publicationDate"
                  rules={[{ required: true }]}
                  className="w-11/12"
                >
                  <DatePicker
                    onChange={onChange}
                    className="w-full"
                    format="MM/DD/YYYY"
                  />
                </Form.Item>
              </div>
              <div className="flex justify-center">
                <Form.Item
                  name="description"
                  label="Description"
                  className="w-11/12"
                >
                  <Input.TextArea className="h-32" showCount maxLength={500} />
                </Form.Item>
              </div>

              <Form.Item label="" className="w-11/12 ml-12 mt-10">
                <Button
                  className="bg-blue-500 border border-white hover:bg-white hover:border  font-bold border-0 text-white hover:text-white"
                  htmlType="submit"
                >
                  {loading ? "Adding.." : "     Add Book"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
