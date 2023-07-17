/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import style from "../pages-css/add-books.module.css";
import { Form, Input, Button, DatePicker, Select } from "antd";
import {
  useGetBookByIdQuery,
  usePatchBookMutation,
} from "../redux/books/booksSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { isLoading } from "../redux/features/commonOptionsSlice";
import Swal from "sweetalert2";
import type { DatePickerProps } from "antd";
import { useState } from "react";
import genre from "../../public/genre.json";
import { MyBook } from "../Interfaces/globalTypes";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/loader";

const EditBook = () => {
  const { id } = useParams();
  const { data: book, isLoading: bookLoading } = useGetBookByIdQuery(id);
  const [date, setData] = useState("");
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.commonOptions);
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date);
    setData(dateString);
  };
  const [patchBook] = usePatchBookMutation();

  const onFinish = async (value: MyBook) => {
    dispatch(isLoading(true));

    const title = value.title ? value.title : book.title;
    const author = value.author ? value.author : book.author;
    const description = value.description
      ? value.description
      : book.description;
    const genre = value.genre ? value.genre : book.genre;
    const image = value.image ? value.image : book.image;
    const publicationDate = value.publicationDate ? date : book.publicationDate;

    const data = { title, author, genre, image, publicationDate, description };

    try {
      const options = {
        data: data,
        id: id,
      };

      const response: any = await patchBook(options);

      console.log(response);

      dispatch(isLoading(false));

      if (response.data.matchedCount == 1) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Succesfully Added a Book",
          showConfirmButton: false,
          timer: 1500,
        });
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
    }
  };

  return (
    <div className={style.container}>
      <div>
        <h1 className="text-2xl font-bold">Edit Book</h1>
        <br />

        {bookLoading ? (
          <Loader />
        ) : (
          <div className="border border-blue-400 p-10 shadow-lg shadow-blue-500/50  rounded">
            <div>
              <Form layout="vertical" colon={false} onFinish={onFinish}>
                <div className="flex justify-around g-10">
                  <Form.Item label="Book Title" name="title" className="w-5/12">
                    <Input
                      size="large"
                      placeholder="Book Title"
                      defaultValue={book?.title}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Author Name"
                    name="author"
                    className="w-5/12"
                  >
                    <Input
                      size="large"
                      placeholder="Author Name"
                      defaultValue={book?.author}
                    />
                  </Form.Item>
                </div>
                <div className="flex justify-around g-10">
                  <Form.Item label="Genre" name="genre" className="w-5/12">
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
                      defaultValue={book?.genre}
                      options={genre}
                    />
                  </Form.Item>

                  <Form.Item label="Image Link" name="image" className="w-5/12">
                    <Input
                      size="large"
                      placeholder="Image Link"
                      defaultValue={book?.image}
                    />
                  </Form.Item>
                </div>
                <div className="flex justify-center">
                  <Form.Item
                    label="Publication Date"
                    name="publicationDate"
                    className="w-11/12"
                  >
                    <DatePicker
                      onChange={onChange}
                      className="w-full"
                      format="MM/DD/YYYY"
                      // defaultValue=
                      placeholder={book?.publicationDate}
                    />
                  </Form.Item>
                </div>
                <div className="flex justify-center">
                  <Form.Item
                    name="description"
                    label="Description"
                    className="w-11/12"
                  >
                    <Input.TextArea
                      className="h-32"
                      showCount
                      maxLength={500}
                      defaultValue={book?.description}
                    />
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
        )}
      </div>
    </div>
  );
};

export default EditBook;
